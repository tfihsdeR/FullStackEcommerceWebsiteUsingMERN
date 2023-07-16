const express = require('express');
const router = express.Router();

const { isAuthenticatedUser } = require("../middlewares/userAuthentication");

const { registerUser, loginUser, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, logoutUser } = require("../controllers/userController");

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)

router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/password/update").put(isAuthenticatedUser, updatePassword)

router.route("/profile").get(isAuthenticatedUser, getUserProfile)
router.route("/profile/update").put(isAuthenticatedUser, updateProfile)

module.exports = router;