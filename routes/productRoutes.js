const express = require("express");
const router = express.Router();

const {
  getProducts,
  addProduct,
} = require("../controllers/productController");

const verifyToken = require("../middleware/authMiddleware");

// protected route
router.get("/products", verifyToken, getProducts);
router.post("/products", verifyToken, addProduct);

module.exports = router;
