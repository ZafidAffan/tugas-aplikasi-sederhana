const db = require("../config/firebase");

// 👇 TARUH DI SINI (PALING ATAS)
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") return res.sendStatus(200);

  next();
});
// GET ALL PRODUCTS
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

    res.status(200).json({
      message: "Data berhasil diambil",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD PRODUCT
const addProduct = async (req, res) => {
  try {
    const { nama, harga } = req.body;

    if (!nama || !harga) {
      return res.status(400).json({
        message: "Nama dan harga wajib diisi",
      });
    }

    const product = {
      nama,
      harga,
      createdAt: new Date(),
      createdBy: req.user.email,
    };

    const docRef = await db
      .collection("products")
      .add(product);

    res.status(201).json({
      message: "Produk berhasil ditambahkan",
      id: docRef.id,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  addProduct,
};
