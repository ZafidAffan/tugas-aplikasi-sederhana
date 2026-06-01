const db = require("../config/firebase");


// =======================
// GET ALL PRODUCTS
// =======================
const getProducts = async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();

    const products = [];

    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return res.status(200).json({
      message: "Data berhasil diambil",
      data: products,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


// =======================
// ADD PRODUCT
// =======================
const addProduct = async (req, res) => {
  try {
    const { nama, harga } = req.body;

    // 🔴 VALIDASI INPUT
    if (!nama || !harga) {
      return res.status(400).json({
        message: "Nama dan harga wajib diisi",
      });
    }

    // 🔴 VALIDASI TOKEN USER
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized: token tidak valid atau tidak dikirim",
      });
    }

    // 🔥 DATA YANG DISIMPAN KE FIRESTORE
    const product = {
      nama,
      harga: Number(harga),
      createdAt: new Date(),
      createdBy: req.user?.email || "unknown",
    };

    // SIMPAN KE FIRESTORE
    const docRef = await db.collection("products").add(product);

    return res.status(201).json({
      message: "Produk berhasil ditambahkan",
      id: docRef.id,
      data: product,
    });

  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};


// =======================
// EXPORT
// =======================
module.exports = {
  getProducts,
  addProduct,
};
