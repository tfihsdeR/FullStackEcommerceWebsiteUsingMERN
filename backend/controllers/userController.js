const crypto = require("crypto");
const cloudinary = require("cloudinary");

const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

// Register a User => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"
    });

    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    sendToken(user, 200, res);
})

// Login a User => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body

    // Check if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400))
    }

    // Finding user in the database
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    // Check if password is correct
    const isMatchedPassword = await user.comparePassword(password)
    if (!isMatchedPassword) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(user, 200, res);
})

// Forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler("User couldn't be found with this email!", 404))
    } else {
        // Get reset token
        const resetToken = await user.getResetPasswordToken()
        await user.save({ validateBeforeSave: false })

        // Create reset password url
        const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

        const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it please.`

        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset Recovery",
                message
            })

            res.status(200).json({
                success: true,
                message: `An email has been sent to: ${user.email}`
            })
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save({ validateBeforeSave: false })

            return next(new ErrorHandler(error.message, 500))
        }
    }
})

// Reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Hash URL token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    console.log("resetPasswordToken: ", resetPasswordToken)
    console.log("date: ", Date.now())

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpired: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler("Password reset token is invalid or has expired", 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400))
    }

    // If passwords are same reset the old password with the new one
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpired = undefined
    await user.save()

    sendToken(user, 200, res)
})

// Get user profile => /api/v1/profile
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

// Update user profile => /api/v1/profile/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })
})

// Update-Change current password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")

    // Check previous password
    const isMatchedPassword = await user.comparePassword(req.body.oldPassword)
    if (!isMatchedPassword) {
        return next(new ErrorHandler("Current password is incorrect", 400))
    }

    user.password = req.body.newPassword
    await user.save()

    sendToken(user, 200, res)
})



// Logout user => /api/v1/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})

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

//Update user profile by user id - ADMIN => /api/v1/admin/user/:id
exports.updateUserByIdByAdmin = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })
})

// Delete user by id - ADMIN => /api/v1/admin/user/:id
exports.deleteUserByIdByAdmin = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404))
    } else {

        // remove the avatar from the claudinary - TODO

        await user.deleteOne()

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    }
})

//#endregion