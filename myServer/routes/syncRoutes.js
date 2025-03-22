const express = require("express");
const { google } = require("googleapis");
const fs = require("fs");
const Product = require("../models/Product");
const ProductAttribute = require("../models/ProductAttribute");
const Category = require("../models/Category");
const Service = require("../models/Service");
const ServiceAttribute = require("../models/ServiceAttribute");
const Discount = require("../models/Discount")
const router = express.Router();

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

    const headers = rows[0].map((h) => h.toLowerCase());

    return rows.slice(1).map((row) => {
      let record = {};
      headers.forEach((header, index) => {
        let value = row[index] || null;

        if (value === "N/A") value = null;
        
        // Xử lý số liệu
        if (value && typeof value === "string" && /^[0-9.,]+$/.test(value)) {
          value = parseFloat(value.replace(/\./g, "").replace(/,/g, ""));
        }

        if (header === "image" && typeof value === "string") {
          value = value
            .split("\n") 
            .map((url) => url.trim()) 
            .filter((url) => url.length > 0);
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


// Hàm đồng bộ dữ liệu
const syncData = async (model, data, uniqueField) => {
  try {
    for (const item of data) {
      const query = { [uniqueField]: item[uniqueField] };
      await model.findOneAndUpdate(query, item, { upsert: true, new: true });
    }
    console.log(`Đồng bộ thành công: ${model.modelName}`);
  } catch (error) {
    console.error(`Lỗi khi đồng bộ ${model.modelName}:`, error);
  }
};

// Định nghĩa route đồng bộ cho từng model
const syncRoutes = [
    { route: "/product", sheet: "Product", model: Product, key: "product_id" },
    { route: "/attributes", sheet: "Product_Attributes", model: ProductAttribute, key: "product_attributes_id" },
    { route: "/category", sheet: "Category", model: Category, key: "category_id" },
    { route: "/service", sheet: "Service", model: Service, key: "service_id" },
    { route: "/service_attributes", sheet: "Service_Attributes", model: ServiceAttribute, key: "service_attributes_id" },
    { route: "/discount", sheet: "Discount", model: Discount, key: "discount_id" },
  ];
  

// Tạo API cho từng route
syncRoutes.forEach(({ route, sheet, model, key }) => {
  router.get(route, async (req, res) => {
    try {
      const data = await fetchSheetData(sheet);
      await syncData(model, data, key);
      res.json({ message: `Đồng bộ sheet '${sheet}' thành công!` });
    } catch (error) {
      console.error(`Lỗi khi đồng bộ ${sheet}:`, error);
      res.status(500).json({ message: `Lỗi khi đồng bộ ${sheet}`, error });
    }
  });
});

module.exports = router;
