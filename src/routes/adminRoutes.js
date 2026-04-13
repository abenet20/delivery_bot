const express = require("express");
const multer = require("multer");
const cloudinary = require("../middleware/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const router = express.Router();
const {
  saveProduct,
  removeProduct,
  updateProduct,
} = require("../controllers/admin/product");
const getOrders = require("../controllers/admin/getOrders");
const getProducts = require("../controllers/admin/getProducts");
const getCustomers = require("../controllers/admin/getCustomers");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
  },
});

const fileUpload = multer({ storage });

router.get("/products", getProducts);
router.get("/orders", getOrders);
router.get("/customers", getCustomers);

router.post("/save-product", fileUpload.single("photo"), saveProduct);
router.put("/update-product", fileUpload.single("photo"), updateProduct);
router.delete("/remove-product", removeProduct);

module.exports = router;
