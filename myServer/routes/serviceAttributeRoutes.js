const express = require("express");
const ServiceAttribute = require("../models/ServiceAttribute");

const router = express.Router();

// Lấy danh sách tất cả thuộc tính dịch vụ
router.get("/", async (req, res) => {
  try {
    const serviceAttributes = await ServiceAttribute.find();
    res.json(serviceAttributes);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách thuộc tính dịch vụ", error });
  }
});

// Lấy chi tiết một thuộc tính dịch vụ
router.get("/:attribute_id", async (req, res) => {
  try {
    const serviceAttribute = await ServiceAttribute.findOne({ attribute_id: req.params.attribute_id });
    if (!serviceAttribute) return res.status(404).json({ message: "Không tìm thấy thuộc tính dịch vụ" });
    res.json(serviceAttribute);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết thuộc tính dịch vụ", error });
  }
});

// Thêm mới một thuộc tính dịch vụ
router.post("/", async (req, res) => {
  try {
    const newServiceAttribute = new ServiceAttribute(req.body);
    await newServiceAttribute.save();
    res.status(201).json(newServiceAttribute);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm thuộc tính dịch vụ", error });
  }
});

// Cập nhật thuộc tính dịch vụ
router.put("/:attribute_id", async (req, res) => {
  try {
    const updatedServiceAttribute = await ServiceAttribute.findOneAndUpdate(
      { attribute_id: req.params.attribute_id },
      req.body,
      { new: true }
    );
    res.json(updatedServiceAttribute);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật thuộc tính dịch vụ", error });
  }
});

// Xóa thuộc tính dịch vụ
router.delete("/:attribute_id", async (req, res) => {
  try {
    await ServiceAttribute.findOneAndDelete({ attribute_id: req.params.attribute_id });
    res.json({ message: "Đã xóa thuộc tính dịch vụ thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa thuộc tính dịch vụ", error });
  }
});

module.exports = router;
