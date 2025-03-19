const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: String },
    phone: { type: String, unique: true }, 
    email: { type: String, required: true, unique: true }, 
    avatar: { type: String }
}, { timestamps: true });

const User = mongoose.model("User", userSchema, "users");
module.exports = User;