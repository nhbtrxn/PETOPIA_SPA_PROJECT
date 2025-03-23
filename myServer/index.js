const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const syncRoutes = require("./routes/syncRoutes");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const { google } = require("googleapis");
const User = require("./models/User");
const multer = require("multer");
const axios = require("axios");

app.use(express.json());
app.use(cors());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Kết nối MongoDB thành công!"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// Import routes
app.use("/sync", require("./routes/syncRoutes"));
app.use("/services", require("./routes/serviceRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/categories", require("./routes/categoryRoutes"));
app.use("/productattributes", require("./routes/productAttributeRoutes"));
app.use("/serviceattributes", require("./routes/serviceAttributeRoutes"));
app.use("/discount",require("./routes/discountRoutes"));

// Kiểm tra server
app.get("/", (req, res) => res.send("API đang chạy!"));

app.listen(PORT, () => console.log(`Server đang chạy tại http://localhost:${PORT}`));
