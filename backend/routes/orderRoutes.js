const express = require('express');
const router = express.Router();

const { createOrder, getOrderById, myOrders, getAllOrdersByAdmin } = require("../controllers/orderController")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/userAuthentication")

//#region General Routes
router.route("/order/new").post(isAuthenticatedUser, createOrder) // create
router.route("/order/:id").get(isAuthenticatedUser, getOrderById) // get by id
router.route("/orders/profile").get(isAuthenticatedUser, myOrders) // my orders
//#endregion

//#region Admin Routes
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrdersByAdmin) // get all orders - ADMIN
//#endregion

module.exports = router;