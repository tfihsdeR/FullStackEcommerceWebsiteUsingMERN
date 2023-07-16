const User = require("../models/user");

const catchAsyncErrors = require("./catchAsyncErrors")
const ErrorHandler = require("../utils/errorHandler")
const jwt = require("jsonwebtoken")

// Check if user is authenticated
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return next(new ErrorHandler("Login first to the access this source!", 401))
    } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next()
    }
})

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource!`, 403)
            )
        } else {
            next()
        }
    }
}

//#region Admin Routes

// Get all users => /api/v1/admin/allUsers
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const allUsers = await User.find()

    res.status(200).json({
        success: true,
        count: allUsers.length,
        allUsers
    })
})

// Get usser by id => /api/v1/admin/user/:id
exports.getUserDetailsById = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        user
    })
})

//#endregion