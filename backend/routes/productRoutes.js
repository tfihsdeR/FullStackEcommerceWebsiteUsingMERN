const express = require("express")
const router = express.Router();

const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviewsOfAProdcut, deleteReview } = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/userAuthentication")

//#region General Routes
router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/user/review").put(isAuthenticatedUser, createReview) // create a new review - each user can add only one review
router.route("/reviews").get(getReviewsOfAProdcut) // Get all reviews of a prodcut
//#endregion

//#region Admin Routes
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.route("/admin/review").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview) // Delete a review
//#endregion

module.exports = router;