const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles, getAllUsers, getUserDetailsById } = require("../middlewares/userAuthentication");

const { registerUser, loginUser, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, logoutUser } = require("../controllers/userController");

//#region General Routes
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)

router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/password/update").put(isAuthenticatedUser, updatePassword)

router.route("/profile").get(isAuthenticatedUser, getUserProfile)
router.route("/profile/update").put(isAuthenticatedUser, updateProfile)
//#endregion

//#region Admin Routes
router.route("/admin/allUsers").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetailsById)
//#endregion

module.exports = router;