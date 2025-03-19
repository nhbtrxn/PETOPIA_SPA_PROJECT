const express = require("express");
const { google } = require("googleapis");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const cors = require("cors");
const User = require("./models/User");
const multer = require("multer");
const axios = require("axios");

// Cấu hình môi trường
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: "100mb", extended: true }));

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
// Lấy danh sách Product
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách Product:", error);
        res.status(500).json({ message: "Lỗi khi lấy danh sách Product", error });
    }
});

// Lấy danh sách ProductAttribute
app.get("/product-attributes", async (req, res) => {
    try {
        const productAttributes = await ProductAttribute.find();
        res.json(productAttributes);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách ProductAttribute:", error);
        res.status(500).json({ message: "Lỗi khi lấy danh sách ProductAttribute", error });
    }
});

// Lấy danh sách Service
app.get("/services", async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách Service:", error);
        res.status(500).json({ message: "Lỗi khi lấy danh sách Service", error });
    }
});

// Lấy danh sách Category
app.get("/categories", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách Category:", error);
        res.status(500).json({ message: "Lỗi khi lấy danh sách Category", error });
    }
});

// Lấy danh sách ServiceAttribute
app.get("/service-attributes", async (req, res) => {
    try {
        const serviceAttributes = await ServiceAttribute.find();
        res.json(serviceAttributes);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách ServiceAttribute:", error);
        res.status(500).json({ message: "Lỗi khi lấy danh sách ServiceAttribute", error });
    }
});
// Lấy thông tin chi tiết của một dịch vụ theo service_id

app.get("/services/:service_id", async (req, res) => {
    try {
        const service = await Service.aggregate([
            {
                $match: { service_id: req.params.service_id }
            },
            {
                $lookup: {
                    from: "serviceattributes", // Collection trong MongoDB
                    localField: "service_id",
                    foreignField: "service_id",
                    as: "attributes"
                }
            }
        ]);

        if (!service || service.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy dịch vụ" });
        }

        res.json(service[0]); // Trả về object thay vì mảng
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết dịch vụ:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
});

app.get("/products/:product_id", async (req, res) => {
    try {
        const product = await Product.aggregate([
            {
                $match: { product_id: req.params.product_id }
            },
            {
                $lookup: {
                    from: "productattributes", // Collection lưu thông tin chi tiết sản phẩm
                    localField: "product_id",
                    foreignField: "product_id",
                    as: "attributes"
                }
            }
        ]);

        if (!product || product.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }

        res.json(product[0]); // Trả về object thay vì mảng
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
});

// Kiểm tra server
app.get("/", (req, res) => {
    res.send("API đang chạy! Sử dụng /sync/{ten_sheet} để đồng bộ từng sheet.");
});


// Khởi động server
app.listen(PORT, () => console.log(`Server đang chạy tại http://localhost:${PORT}`));

mongoose.connect("mongodb://localhost:27017/petopia_spa", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post("/register", async (req, res) => {
    const { username, password, dob, phone, email, avatar } = req.body;
    try {
        const newUser = new User({ username, password, dob, phone, email, avatar });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// API lấy danh sách user
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/check-account", async (req, res) => {
    console.log("Kiểm tra tài khoản:", req.body);
  
    try {
      const { phone, email } = req.body;
  
      // Tìm user theo số điện thoại hoặc email
      const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
  
      if (existingUser) {
        return res.json({ exists: true });
      }
  
      res.json({ exists: false });
    } catch (error) {
      console.error("Lỗi kiểm tra tài khoản:", error);
      res.status(500).json({ error: "Lỗi server" });
    }
  });



// API Đăng nhập
app.post("/login", async (req, res) => {
    console.log("Nhận yêu cầu đăng nhập:", req.body);

    try {
        const { emailOrPhone, password } = req.body;

        // Kiểm tra xem user có tồn tại không
        const user = await User.findOne({ 
            $or: [{ phone: emailOrPhone }, { email: emailOrPhone }]
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Tài khoản không tồn tại!" });
        }

        // Kiểm tra mật khẩu
        if (user.password !== password) {
            return res.status(400).json({ success: false, message: "Sai mật khẩu!" });
        }

        res.json({ success: true, message: "Đăng nhập thành công!", user });
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        res.status(500).json({ success: false, message: "Lỗi server!" });
    }
});



//Cấu hình multer để lưu file tạm thời trước khi upload lên Imgur
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Không có file nào được chọn!" });
    }

    const image = fs.readFileSync(req.file.path, { encoding: "base64" }); //Chuyển ảnh sang base64

    const response = await axios.post("https://api.imgur.com/3/image", 
      { image: image }, 
      {
        headers: { Authorization: "Client-ID 8276f1ad88d01d4" }
      }
    );

    fs.unlinkSync(req.file.path); // Xóa file sau khi upload thành công
    res.json({ link: response.data.data.link }); // link ảnh từ Imgur

  } catch (error) {
    console.error("Lỗi khi upload ảnh lên Imgur:", error);
    res.status(500).json({ error: "Lỗi khi upload ảnh lên Imgur!" });
  }
});