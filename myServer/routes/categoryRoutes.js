const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

// Lấy danh sách danh mục
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách danh mục", error });
  }
});

// Thêm danh mục mới
router.post("/", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm danh mục", error });
  }
});

// Cập nhật danh mục
router.put("/:category_id", async (req, res) => {
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { category_id: req.params.category_id },
      req.body,
      { new: true }
    );
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật danh mục", error });
  }
});

// Xóa danh mục
router.delete("/:category_id", async (req, res) => {
  try {
    await Category.findOneAndDelete({ category_id: req.params.category_id });
    res.json({ message: "Đã xóa danh mục thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa danh mục", error });
  }
});

module.exports = router;
