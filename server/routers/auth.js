const express = require("express");
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const User = require("../models/user");
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || "fasesaddyuasqwee16asdas2"; 

// Đăng ký
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Tài khoản đã tồn tại!" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const user = new User({
      email,
      password: hashedPassword,
      name,
      phone,
    });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Đăng nhập
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Đăng nhập với email:", email);
    console.log("Đăng nhập với mật khẩu:", password);
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Email này không tồn tại!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Mật khẩu không đúng!" });
    }

    jwt.sign({ email: user.email, id: user._id }, jwtSecret, {}, async (err, token) => {
      if (err) {
        console.error("JWT error:", err);
        return res.status(500).json({ error: "JWT error" });
      }

      user.token = token;
      await user.save();
      res.cookie('token', token).json(user);
    });
  } catch (e) {
    console.error("Sign-in error:", e.message);
    res.status(500).json({ error: e.message });
  }
});

// Xác thực token
authRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, jwtSecret);
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Lấy dữ liệu người dùng
authRouter.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;
