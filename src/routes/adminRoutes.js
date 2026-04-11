const express = require("express");
const router = express.Router();
const {
  saveProduct,
  removeProduct,
  updateProduct,
} = require("../controllers/product");

router.post("save-product", saveProduct);
router.post("update-product", updateProduct);
router.post("remove-product", removeProduct);

module.exports = router;
