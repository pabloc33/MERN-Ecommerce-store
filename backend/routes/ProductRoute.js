const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getSingleProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controller/ProductController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAdminProducts);
router
  .route("/products/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct)
  .get(getSingleProduct);
router.route("/products/review").post(isAuthenticatedUser, createProductReview);
router
  .route("/review")
  .get(getSingleProductReviews)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteReview);

module.exports = router;
