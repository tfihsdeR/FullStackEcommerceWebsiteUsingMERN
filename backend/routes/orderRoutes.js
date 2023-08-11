const express = require('express');
const router = express.Router();

const { createOrder, getOrderById, userOrders, getAllOrdersByAdmin, updateOrderStatusByAdmin, deleteOrderById } = require("../controllers/orderController")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/userAuthentication")

//#region General Routes
router.route("/user/order/new").post(isAuthenticatedUser, createOrder) // create
router.route("/user/order/:id").get(isAuthenticatedUser, getOrderById) // get by id
router.route("/user/orders").get(isAuthenticatedUser, userOrders) // my orders
//#endregion

//#region Admin Routes
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrdersByAdmin) // get all orders - ADMIN
router.route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatusByAdmin) // update order status to delivered - ADMIN
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrderById) // delete order by id - ADMIN
//#endregion

module.exports = router;