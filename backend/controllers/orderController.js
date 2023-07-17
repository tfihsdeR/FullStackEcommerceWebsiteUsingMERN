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

// Get all orders - ADMIN => /api/v1/amin/orders
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

// Update status of the order - ADMIN => /api/v1/admin/order/:id
exports.updateOrderStatusByAdmin = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order!", 400))
    } else {
        order.orderItems.forEach(async item => {
            await updateStock(item.product, item.quantity)
        })

        order.orderStatus = req.body.orderStatus
        order.dateOfDelivery = Date.now()
        await order.save()

        res.status(200).json({
            success: true,
        })
    }
})

// Delete order - ADMIN => /api/v1/admin/order/:id
exports.deleteOrderById = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    } else {
        await order.deleteOne()

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        })
    }
})
//#endregion

async function updateStock(product, quantity) {
    const _product = await Product.findById(product)
    _product.stock = _product.stock - quantity
    await _product.save({ validateBeforeSave: false })
}