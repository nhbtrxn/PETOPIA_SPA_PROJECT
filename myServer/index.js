
const express = require("express");
const { google } = require("googleapis");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const cors = require("cors");

// Cấu hình môi trường
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Kết nối MongoDB thành công!"))
    .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// Import models
const Product = require("./models/Product");
const ProductAttribute = require("./models/ProductAttribute");
const Category = require("./models/Category");
const Service = require("./models/Service");
const ServiceAttribute = require("./models/ServiceAttribute");

// Kết nối Google Sheets
const credentialsPath = "./credentials.json";
if (!fs.existsSync(credentialsPath)) {
    console.error("Lỗi không tìm thấy file credentials.json");
    process.exit(1);
}
const auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});
const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = "1vJ8tBPyYjC_bxL0zaq9qWCJ5bWm223760MdtC5PTsjA";

// Hàm lấy dữ liệu từ Google Sheets
const fetchSheetData = async (sheetName) => {
    try {
        console.log(`Đang lấy dữ liệu từ sheet ${sheetName}...`);
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: sheetName,
        });
        const rows = response.data.values;
        if (!rows || rows.length === 0) return [];

        const headers = rows[0].map(h => h.toLowerCase());
        return rows.slice(1).map(row => {
            let record = {};
            headers.forEach((header, index) => {
                let value = row[index] || null;
                if (value === "N/A") value = null;
                if (value && typeof value === "string" && /^[0-9.,]+$/.test(value)) {
                    value = parseFloat(value.replace(/\./g, "").replace(/,/g, ""));
                }
                if (header === "image" && value) {
                    value = value.split(/[\n, ]+/).filter(Boolean);
                }
                record[header] = value;
            });
            return record;
        });
    } catch (error) {
        console.error(`Lỗi khi lấy dữ liệu từ sheet ${sheetName}:`, error);
        return [];
    }
};

// Hàm đồng bộ dữ liệu với cập nhật và thêm mới
const syncData = async (model, data, uniqueField) => {
    try {
        for (const item of data) {
            const query = {};
            query[uniqueField] = item[uniqueField];
            await model.findOneAndUpdate(query, item, { upsert: true, new: true });
        }
        console.log(`Đồng bộ thành công: ${model.modelName}`);
    } catch (error) {
        console.error(`Lỗi khi đồng bộ ${model.modelName}:`, error);
    }
};

// API đồng bộ dữ liệu từ từng sheet riêng lẻ
const syncRoutes = [
    { route: "/sync/product", sheet: "Product", model: Product, key: "product_id" },
    { route: "/sync/attributes", sheet: "Product_Attributes", model: ProductAttribute, key: "product_attributes_id" },
    { route: "/sync/category", sheet: "Category", model: Category, key: "category_id" },
    { route: "/sync/service", sheet: "Service", model: require("./models/Service"), key: "service_id" },
    { route: "/sync/service_attributes", sheet: "Service_Attributes", model: require("./models/ServiceAttribute"), key: "service_attributes_id" }
];

syncRoutes.forEach(({ route, sheet, model, key }) => {
    app.get(route, async (req, res) => {
        try {
            const data = await fetchSheetData(sheet);
            await syncData(model, data, key);
            res.json({ message: `Dữ liệu từ sheet '${sheet}' đã đồng bộ vào MongoDB!` });
        } catch (error) {
            console.error(`Lỗi khi đồng bộ ${sheet}:`, error);
            res.status(500).json({ message: `Lỗi khi đồng bộ ${sheet}`, error });
        }
    });
});

// Kiểm tra server
app.get("/", (req, res) => {
    res.send("API đang chạy! Sử dụng /sync/{ten_sheet} để đồng bộ từng sheet.");
});

// Khởi động server
app.listen(PORT, () => console.log(`Server đang chạy tại http://localhost:${PORT}`));
