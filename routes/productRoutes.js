const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProduct,
} = require("../controllers/productController");
const { uploadImage } = require("../controllers/uploadsController");

router.route("/").get(getAllProduct).post(createProduct);
router.route("/uploads").post(uploadImage);

module.exports = router;
