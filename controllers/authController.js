const db = require("../config/firebase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 👇 TARUH DI SINI (PALING ATAS)
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") return res.sendStatus(200);

  next();
});
// REGISTER
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // cek email sudah ada atau belum
    const userSnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!userSnapshot.empty) {
      return res.status(400).json({
        message: "Email sudah terdaftar",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // simpan user
    const newUser = await db.collection("users").add({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Register berhasil",
      userId: newUser.id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userSnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (userSnapshot.empty) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // cek password
    const isMatch = await bcrypt.compare(
      password,
      userData.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Password salah",
      });
    }

    // generate jwt
    const token = jwt.sign(
      {
        id: userDoc.id,
        email: userData.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
