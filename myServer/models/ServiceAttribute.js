const mongoose = require("mongoose");

const serviceAttributeSchema = new mongoose.Schema({
    service_attributes_id: { type: String, required: true, unique: true },
    // service_id: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    service_id: { type: String, required: true,ref:"Service" },
    min_price: { type: Number, required: true },
    max_price: { type: Number, required: true },
    min_size: { type: Number, required: false },
    max_size: { type: Number, required: false },
    unit: { type: String, required: false },
    dye_option: { type: String, required: false }
});

module.exports = mongoose.model("ServiceAttribute", serviceAttributeSchema);
