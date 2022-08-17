const HttpError = require("../utils/http-error");
const { validationResult } = require("express-validator");

const Product = require("../models/product.model");
const User = require("../models/user.model");
const { default: mongoose } = require("mongoose");

const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    return next(
      new HttpError("Fetching products failed, please try again later.", 500)
    );
  }
  res.json({ products: products.map((p) => p.toObject({ getters: true })) });
};

const getProductById = async (req, res, next) => {
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find a product!", 500)
    );
  }

  if (!product) {
    return next(
      new HttpError("Could not find a product for the provided id.", 404)
    );
  }

  res.json({ product: product.toObject({ getters: true }) });
};

const getProductsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId).populate("products");
  } catch (err) {
    return next(
      new HttpError(
        "Something went wrong, could not find a product by user id."
      ),
      404
    );
  }

  if (!user || user.products.length === 0) {
    return next(
      new HttpError("Could not find a product for the provided user id.", 404)
    );
  }
  res.json({
    products: user.products.map((product) =>
      product.toObject({ getters: true })
    ),
  });
};

const createProduct = async (req, res, next) => {
  let date_ob = new Date();
  const date =
    date_ob.getDate() + "." + date_ob.getMonth() + "." + date_ob.getFullYear();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data!", 422)
    );
  }
  const { name, description, image, price, category, userId, city} =
    req.body;
  const createdProduct = new Product({
    name,
    description,
    image,
    price,
    category,
    userId,
    city,
    date,
  });

  let user;

  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError("Creating place failed, please try again."), 500);
  }

  if (!user) {
    return next(new HttpError("We coud not find user for provided id"), 404);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdProduct.save({ session: session });
    user.products.push(createdProduct);
    await user.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Creating product failed, please try again.", 500)
    );
  }

  res.status(201).json({ product: createdProduct });
};

const updateProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data!", 422)
    );
  }
  const { name, description, image, price, category, city } = req.body;
  const productId = req.params.pid;

  let updatedProduct;
  try {
    updatedProduct = await Product.findById(productId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find a product!", 500)
    );
  }

  if(updatedProduct.userId.toString() !== req.userData.userId){
    return next(
      new HttpError("You are not allowed to edit this product!", 401)
    );
  }

  updatedProduct.name = name;
  updatedProduct.description = description;
  updatedProduct.image = image;
  updatedProduct.price = price;
  updatedProduct.category = category;
  updatedProduct.city = city;

  try {
    await updatedProduct.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update a product!", 404)
    );
  }

  res.status(200).json({ product: updatedProduct.toObject({ getters: true }) });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.pid;
  let deletedProduct;
  try {
    deletedProduct = await Product.findById(productId).populate("userId");
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find a product!", 500)
    );
  }

  if (!deletedProduct) {
    return next(new HttpError("Could not find product for this id.", 404));
  }

  if(deletedProduct.userId.id !== req.userData.userId){
    return next(
      new HttpError("You are not allowed to delete this product!", 401)
    );
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await deletedProduct.remove({ session: session });
    deletedProduct.userId.products.pull(deletedProduct);
    await deletedProduct.userId.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete a product!", 500)
    );
  }

  res.status(200).json({ message: "Product deleted!" });
};

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.getProductsByUserId = getProductsByUserId;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
