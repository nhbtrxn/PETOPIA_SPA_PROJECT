const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    service_id: { type: String, required: true, unique: true },
    service_name: { type: String, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    detail: { type: String, required: false },
    image: [{ type: String }],
});

module.exports = mongoose.model("Service", serviceSchema);
