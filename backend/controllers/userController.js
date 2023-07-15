const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

// Register a User => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "avatar-the-last-airbender",
            url: "https://playtusu.com/wp-content/uploads/2021/11/avatar-the-last-airbender.jpg"
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