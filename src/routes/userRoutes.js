const express = require("express");
const router = express.Router();
const {
  saveOrder,
  removeOrder,
  updateOrder,
} = require("../controllers/user/order");
const getProducts = require("../controllers/user/getProducts");
const getOrders = require("../controllers/user/getOrders");

router.get("/products", getProducts);
router.get("/orders/:userId", getOrders);

router.post("/save-order", saveOrder);
router.put("/update-order/:id", updateOrder);
router.delete("/remove-order", removeOrder);

module.exports = router;
