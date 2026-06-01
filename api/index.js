require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("../routes/authRoutes");
const productRoutes = require("../routes/productRoutes");

const app = express();


// =======================
// ✅ CORS CONFIG (SAFE VERSION)
// =======================
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:5500",
    "https://pab-forntend-r637.vercel.app",
    "https://pab-forntend.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));


// =======================
// ❌ REMOVE app.options("*")
// (INI PENYEBAB CRASH DI VERCEL)
// =======================
// JANGAN DIPAKAI:
// app.options("*", cors());


// =======================
// BODY PARSER
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// =======================
// ROUTES
// =======================
app.use("/api", authRoutes);
app.use("/api", productRoutes);


// =======================
// HEALTH CHECK
// =======================
app.get("/", (req, res) => {
  res.json({
    message: "REST API Firebase Berjalan 🚀",
  });
});


// =======================
// LOCAL SERVER ONLY
// =======================
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


// =======================
// EXPORT FOR VERCEL
// =======================
module.exports = app;
