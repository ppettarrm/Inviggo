const express = require("express");
const { check } = require("express-validator");

const productServices = require("../services/products.service");
const checkAuth = require("../utils/check-auth");

const router = express.Router();

router.get("/", productServices.getProducts);

router.get("/:pid", productServices.getProductById);

router.get("/user/:uid", productServices.getProductsByUserId);

router.use(checkAuth);

router.post(
  "/new",
  [
    check("name").notEmpty(),
    check("description").isLength({ min: 10 }),
    check("image").notEmpty(),
    check("price").notEmpty(),
    check("category").notEmpty(),
    check("userId").notEmpty(),
    check("city").notEmpty()
  ],
  productServices.createProduct
);

router.patch(
  "/:pid",
  [
    check("name").notEmpty(),
    check("description").isLength({ min: 10 }),
    check("image").notEmpty(),
    check("price").notEmpty(),
    check("category").notEmpty(),
    check("city").notEmpty()
  ],
  productServices.updateProduct
);

router.delete("/:pid", productServices.deleteProduct);

module.exports = router;
