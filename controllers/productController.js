const Product = require("../models/Product");
const StatusCode = require("http-status-codes");

const createProduct = async (req, res) => {
  console.log(req.body);
  const product = await Product.create(req.body);
  return res.status(StatusCode.CREATED).json({ product });
};
const getAllProduct = async (req, res) => {
  const products = await Product.find({});
  return res.status(StatusCode.OK).json({ products });
};

module.exports = {
  createProduct,
  getAllProduct,
};
