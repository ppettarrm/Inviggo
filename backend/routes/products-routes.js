const express = require("express");
const { check } = require("express-validator");

const productControllers = require("../controllers/products-controllers");

const router = express.Router();

router.get("/", productControllers.getProducts);

router.get("/:pid", productControllers.getProductById);

router.get("/user/:uid", productControllers.getProductsByUserId);

router.post(
  "/new",
  [
    check("name").notEmpty(),
    check("description").isLength({ min: 10 }),
    check("image").notEmpty(),
    check("price").isNumeric(),
    check("category").notEmpty(),
    check("username").notEmpty(),
    check("city").notEmpty()
  ],
  productControllers.createProduct
);

router.patch(
  "/:pid",
  [
    check("name").notEmpty(),
    check("description").isLength({ min: 25 }),
    check("image").isURL(),
    check("price").isNumeric(),
    check("category").notEmpty(),
    check("city").notEmpty()
  ],
  productControllers.updateProduct
);

router.delete("/:pid", [], productControllers.deleteProduct);

module.exports = router;
