const express = require("express");
const User = require("../models/User");
const multer = require("multer");
const router = express.Router();

// Lấy danh sách người dùng
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng", error });
  }
});

// Lấy chi tiết người dùng
router.get("/:user_id", async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id });
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết người dùng", error });
  }
});

// Thêm người dùng mới
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm người dùng", error });
  }
});

// Cập nhật thông tin người dùng
router.put("/:user_id", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { user_id: req.params.user_id },
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật người dùng", error });
  }
});

// Xóa người dùng
router.delete("/:user_id", async (req, res) => {
  try {
    await User.findOneAndDelete({ user_id: req.params.user_id });
    res.json({ message: "Đã xóa người dùng thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa người dùng", error });
  }
});

router.post("/register", async (req, res) => {
  const { username, password, dob, phone, email, avatar } = req.body;
  try {
      const newUser = new User({ username, password, dob, phone, email, avatar });
      await newUser.save();
      res.status(201).json({ message: "Người dùng đăng ký thành công!" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.post("/check-account", async (req, res) => {
  console.log("Kiểm tra tài khoản:", req.body);

  try {
    const { phone, email } = req.body;

    // Tìm user theo số điện thoại hoặc email
    const existingUser = await User.findOne({ $or: [{ phone }, { email }] });

    if (existingUser) {
      return res.json({ exists: true });
    }

    res.json({ exists: false });
  } catch (error) {
    console.error("Lỗi kiểm tra tài khoản:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});



// API Đăng nhập
router.post("/login", async (req, res) => {
  console.log("Nhận yêu cầu đăng nhập:", req.body);

  try {
      const { emailOrPhone, password } = req.body;

      // Kiểm tra xem user có tồn tại không
      const user = await User.findOne({ 
          $or: [{ phone: emailOrPhone }, { email: emailOrPhone }]
      });

      if (!user) {
          return res.status(400).json({ success: false, message: "Tài khoản không tồn tại!" });
      }

      // Kiểm tra mật khẩu
      if (user.password !== password) {
          return res.status(400).json({ success: false, message: "Sai mật khẩu!" });
      }

      res.json({ success: true, message: "Đăng nhập thành công!", user });
  } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      res.status(500).json({ success: false, message: "Lỗi server!" });
  }
});



//Cấu hình multer để lưu file tạm thời trước khi upload lên Imgur
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("avatar"), async (req, res) => {
try {
  if (!req.file) {
    return res.status(400).json({ error: "Không có file nào được chọn!" });
  }

  const image = fs.readFileSync(req.file.path, { encoding: "base64" }); //Chuyển ảnh sang base64

  const response = await axios.post("https://api.imgur.com/3/image", 
    { image: image }, 
    {
      headers: { Authorization: "Client-ID 8276f1ad88d01d4" }
    }
  );

  fs.unlinkSync(req.file.path); // Xóa file sau khi upload thành công
  res.json({ link: response.data.data.link }); // link ảnh từ Imgur

} catch (error) {
  console.error("Lỗi khi upload ảnh lên Imgur:", error);
  res.status(500).json({ error: "Lỗi khi upload ảnh lên Imgur!" });
}
});
module.exports = router;
