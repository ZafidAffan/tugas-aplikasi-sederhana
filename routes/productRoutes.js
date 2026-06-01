const express = require("express");
const router = express.Router();

const {
  getProducts,
  addProduct,
} = require("../controllers/productController");

const verifyToken = require("../middleware/authMiddleware");

// protected route
router.get("/products",  getProducts);
router.post("/products",  addProduct);

module.exports = router;
