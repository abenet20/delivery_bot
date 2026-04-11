const Order = require("../../models/orders");
const Product = require("../../models/products");
const User = require("../../models/users");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    const orderedProductDetails = await Product.find({
      _id: { $in: orders.map((order) => order.productId) },
    });
    const customerDetails = await User.find({
      _id: { $in: orders.map((order) => order.userId) },
    });

    const result = orders.map((order) => {
      const product = orderedProductDetails.find(
        (p) => p._id.toString() === order.productId.toString(),
      );

      const customer = customerDetails.find(
        (c) => c._id.toString() === order.userId.toString(),
      );

      return {
        ...order.toObject(),
        product,
        customer,
      };
    });

    res.status(200).json({
      success: true,
      orders: result,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = getOrders;
