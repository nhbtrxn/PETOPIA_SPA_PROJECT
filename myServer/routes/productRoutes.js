const express = require("express");
const Product = require("../models/Product");
const ProductAttribute = require("../models/ProductAttribute");

const router = express.Router();

// Lấy danh sách sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm", error });
  }
});

// Lấy chi tiết sản phẩm và thuộc tính của nó
router.get("/:product_id", async (req, res) => {
  try {
    const product = await Product.aggregate([
      { $match: { product_id: req.params.product_id } },
      {
        $lookup: {
          from: "productattributes",
          localField: "product_id",
          foreignField: "product_id",
          as: "attributes",
        },
      },
    ]);

    if (!product || product.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json(product[0]);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết sản phẩm", error });
  }
});

// Thêm sản phẩm mới
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm sản phẩm", error });
  }
});

// Cập nhật sản phẩm
router.put("/:product_id", async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { product_id: req.params.product_id },
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm", error });
  }
});

// Xóa sản phẩm
router.delete("/:product_id", async (req, res) => {
  try {
    await Product.findOneAndDelete({ product_id: req.params.product_id });
    res.json({ message: "Đã xóa sản phẩm thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error });
  }
});

module.exports = router;
