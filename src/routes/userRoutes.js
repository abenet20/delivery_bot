const express = require("express");
const router = express.Router();
const { saveOrder, removeOrder } = require("../controllers/order");

router.post("/save-order", saveOrder);
router.post("/remove-order", removeOrder);

module.exports = router;
