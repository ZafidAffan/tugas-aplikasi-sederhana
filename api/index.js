require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("../routes/authRoutes");
const productRoutes = require("../routes/productRoutes");

const app = express();


// =======================
// ✅ CORS CONFIG FIX
// =======================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:5500",
      "https://pab-forntend-r637.vercel.app",
      "https://pab-forntend.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// =======================
// ✅ HANDLE PRE-FLIGHT (IMPORTANT)
// =======================
app.options("*", cors());


// =======================
// ✅ MIDDLEWARE BODY PARSER
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// =======================
// ROUTES
// =======================
app.use("/api", authRoutes);
app.use("/api", productRoutes);


// =======================
// TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.json({
    message: "REST API Firebase Berjalan 🚀",
  });
});


// =======================
// SERVER (LOCAL ONLY)
// =======================
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


// =======================
// EXPORT (VERCEL)
// =======================
module.exports = app;
