const Product = require("../models/product")
const Order = require("../models/order");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//#region General Queries
// Create a new order => /ai/v1/order/new
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
    console.log("code section: orderController")
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        dateOfPayment: Date.now(),
        user: req.user._id
    })

    res.status(201).json({
        success: true,
        order
    })
})

// Get single order => /api/v1/order/:id
exports.getOrderById = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")

    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    } else {
        res.status(200).json({
            success: true,
            order
        })
    }
})

// Get logged in user orders => /api/v1/orders/profile
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    if (!orders) {
        return next(new ErrorHandler("Orders not found", 404))
    } else {
        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        })
    }
})
//#endregion

//#region Admin Queries
exports.getAllOrdersByAdmin = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()

    let totalPrice = 0
    orders.forEach(order => {
        totalPrice += order.totalPrice
    })

    res.status(200).json({
        success: true,
        count: orders.length,
        totalPrice,
        orders
    })
})
//#endregion