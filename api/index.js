require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("../routes/authRoutes");
const productRoutes = require("../routes/productRoutes");

const app = express();

// ✅ CORS FIX (WAJIB)
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://127.0.0.1:5500",
        "https://pab-forntend-r637.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "REST API Firebase Berjalan"
  });
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
