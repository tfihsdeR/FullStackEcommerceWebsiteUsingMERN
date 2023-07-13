const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

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

    res.status(201).json({
        success: true,
        user
    })
})
