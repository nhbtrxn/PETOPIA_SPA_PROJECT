const express = require("express");
const ProductAttribute = require("../models/ProductAttribute");

const router = express.Router();

// Lấy danh sách tất cả thuộc tính sản phẩm
router.get("/", async (req, res) => {
  try {
    const productAttributes = await ProductAttribute.find();
    res.json(productAttributes);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách thuộc tính sản phẩm", error });
  }
});

// Lấy chi tiết một thuộc tính sản phẩm
router.get("/:attribute_id", async (req, res) => {
  try {
    const productAttribute = await ProductAttribute.findOne({ attribute_id: req.params.attribute_id });
    if (!productAttribute) return res.status(404).json({ message: "Không tìm thấy thuộc tính sản phẩm" });
    res.json(productAttribute);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết thuộc tính sản phẩm", error });
  }
});

// Thêm mới một thuộc tính sản phẩm
router.post("/", async (req, res) => {
  try {
    const newProductAttribute = new ProductAttribute(req.body);
    await newProductAttribute.save();
    res.status(201).json(newProductAttribute);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm thuộc tính sản phẩm", error });
  }
});

// Cập nhật thuộc tính sản phẩm
router.put("/:attribute_id", async (req, res) => {
  try {
    const updatedProductAttribute = await ProductAttribute.findOneAndUpdate(
      { attribute_id: req.params.attribute_id },
      req.body,
      { new: true }
    );
    res.json(updatedProductAttribute);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật thuộc tính sản phẩm", error });
  }
});

// Xóa thuộc tính sản phẩm
router.delete("/:attribute_id", async (req, res) => {
  try {
    await ProductAttribute.findOneAndDelete({ attribute_id: req.params.attribute_id });
    res.json({ message: "Đã xóa thuộc tính sản phẩm thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa thuộc tính sản phẩm", error });
  }
});

module.exports = router;
