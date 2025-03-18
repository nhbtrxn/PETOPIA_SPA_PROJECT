const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_id: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    category_id: { type: String, required: true, ref: "Category" }, 
    brand: { type: String, required: true },
    product_name: { type: String, required: true },
    detail: { type: String },
    image: { type: [String], default: [] }, 
});

module.exports = mongoose.model("Product", productSchema);