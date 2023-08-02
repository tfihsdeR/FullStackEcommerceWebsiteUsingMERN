const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/userAuthentication");

const { registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    logoutUser,
    getAllUsers,
    getUserDetailsById,
    updateUserByIdByAdmin,
    deleteUserByIdByAdmin
} = require("../controllers/userController");

//#region General Routes
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)

router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/user/password/update").put(isAuthenticatedUser, updatePassword)

router.route("/profile").get(isAuthenticatedUser, getUserProfile)
router.route("/user/profile/update").put(isAuthenticatedUser, updateProfile)
//#endregion

//#region Admin Routes
router.route("/admin/allUsers").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)
router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetailsById)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserByIdByAdmin)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUserByIdByAdmin)
//#endregion

module.exports = router;