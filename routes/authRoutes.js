const express = require("express");
const router = express.Router();

// 👇 TARUH DI SINI (PALING ATAS)
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") return res.sendStatus(200);

  next();
});
const {
  register,
  login,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
