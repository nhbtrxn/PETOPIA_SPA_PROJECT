const express = require("express");
const Service = require("../models/Service");
const ServiceAttribute = require("../models/ServiceAttribute");

const router = express.Router();

// Lấy danh sách service
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách service", error });
  }
});

// Lấy chi tiết service và attributes của nó
router.get("/:service_id", async (req, res) => {
  try {
    const service = await Service.aggregate([
      { $match: { service_id: req.params.service_id } },
      {
        $lookup: {
          from: "serviceattributes",
          localField: "service_id",
          foreignField: "service_id",
          as: "attributes",
        },
      },
    ]);

    if (!service || service.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy dịch vụ" });
    }

    res.json(service[0]);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết service", error });
  }
});

module.exports = router;
