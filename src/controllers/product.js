const Product = require("../models/products");

const saveProduct = async (
  name,
  description,
  price,
  status,
  category,
  quantity,
  photo,
) => {
  try {
    const savedProduct = await Product.create({
      name,
      description,
      price,
      status,
      category,
      quantity,
      photo,
    });
    return savedProduct;
  } catch (error) {
    console.log("failed", error);
    throw error;
  }
};

const updateProduct = async (field, value, key, keyVal) => {
  try {
    const updatedProduct = await Product.updateOne({}, { key: keyVal });
    return updatedProduct;
  } catch (error) {
    console.log("failed", error);
    throw error;
  }
};

const removeProduct = async (productId) => {
  try {
    const remove = await Product.deleteOne(productId);
    return remove;
  } catch (error) {
    console.log("failed", error);
    throw error;
  }
};

module.exports = { saveProduct, updateProduct, removeProduct };
