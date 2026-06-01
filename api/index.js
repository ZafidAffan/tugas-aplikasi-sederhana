require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("../routes/authRoutes");
const productRoutes = require("../routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "REST API Firebase Berjalan"
  });
});

module.exports = app;
