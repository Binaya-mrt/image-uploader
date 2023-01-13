const path = require("path");
const Product = require("../models/Product");
const StatusCode = require("http-status-codes");
const customError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// const uploadImage = async (req, res) => {
//   let { product, price } = req.body;
//   price = Number(price);

//   if (!req.files) {
//     throw new customError.BadRequestError("no files uploaded");
//   }

//   const productImage = req.files.image;
//   if (!productImage.mimetype.startsWith("image")) {
//     throw new customError.BadRequestError("Please upload an image");
//   }
//   const maxSize = 1024 * 1024;

//   if (productImage.size > maxSize) {
//     throw new customError.BadRequestError("Please upload image less than 1 MB");
//   }
//   const imagePath = path.join(
//     __dirname,
//     "../public/uploads/" + `${productImage.name}`
//   );
//   await productImage.mv(imagePath);
//   console.log(`/uploads/${productImage.name}`);
// };
const uploadImage = async (req, res) => {
  let { name, price } = req.body;
  price = Number(price);
  if (!req.files) {
    throw new customError.BadRequestError("no files uploaded");
  }

  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new customError.BadRequestError("Please upload an image");
  }
  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new customError.BadRequestError("Please upload image less than 1 MB");
  }
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "image-upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  const newProduct = {
    name: name,
    price: price,
    image: result.secure_url,
  };
  console.log(newProduct);
  const product = await Product.create(newProduct);
  console.log(product);
  return res.status(StatusCode.OK).json({ product });
};

module.exports = {
  uploadImage,
};
