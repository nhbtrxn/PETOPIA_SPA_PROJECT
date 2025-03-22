const express = require("express");
const router = express.Router();
const Discount = require("../models/Discount");

//Lấy tất cả các giảm giá
router.get("/", async (req, res) => {
    try {
        const discounts = await Discount.find();
        res.status(200).json(discounts);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách giảm giá", error });
    }
});

//Lấy chi tiết giảm giá theo ID
router.get("/:id", async (req, res) => {
    try {
        const discount = await Discount.findOne({ discount_id: req.params.id });
        if (!discount) {
            return res.status(404).json({ message: "Giảm giá không tồn tại!" });
        }
        res.status(200).json(discount);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy giảm giá", error });
    }
});

//Tạo mới giảm giá
router.post("/", async (req, res) => {
    try {
        const newDiscount = new Discount(req.body);
        await newDiscount.save();
        res.status(201).json({ message: "Tạo giảm giá thành công!", newDiscount });
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi tạo giảm giá", error });
    }
});

//Cập nhật giảm giá theo ID
router.put("/:id", async (req, res) => {
    try {
        const updatedDiscount = await Discount.findOneAndUpdate(
            { discount_id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedDiscount) {
            return res.status(404).json({ message: "Giảm giá không tồn tại!" });
        }
        res.status(200).json({ message: "Cập nhật giảm giá thành công!", updatedDiscount });
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi cập nhật giảm giá", error });
    }
});

//Xóa giảm giá theo ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedDiscount = await Discount.findOneAndDelete({ discount_id: req.params.id });
        if (!deletedDiscount) {
            return res.status(404).json({ message: "Giảm giá không tồn tại!" });
        }
        res.status(200).json({ message: "Xóa giảm giá thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa giảm giá", error });
    }
});

module.exports = router;
