const User = require("../../models/users");

const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" });
    res.status(200).json({ success: true, customers });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = getCustomers;
