const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
    discount_id: { type: String, required: true, unique: true },
    percentage: { type: Number, required: true, min: 0, max: 100 }, 
    start_date: { type: Date, required: true }, 
    end_date: { type: Date, required: true }, 
    description: { type: String, default: "" }, 
    active: { type: Boolean, default: true }, 
});
module.exports = mongoose.model("Discount", discountSchema);
