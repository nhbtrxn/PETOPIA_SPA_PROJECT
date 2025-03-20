const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
    product_attributes_id: { type: String, required: true, unique: true },
    product_id: { type: String, ref: "Product", required: true },
    price: { type: Number, required: true },
    size: { type: String },
    color: { type: String },
    unit: {type:String},
    discount_id: { type: String },
});

module.exports = mongoose.model("ProductAttribute", attributeSchema);
