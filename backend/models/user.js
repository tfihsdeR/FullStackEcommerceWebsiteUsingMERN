const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const useSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name."],
        trim: true,
        maxlength: [30, "Your name can not exceed 30 characters."]
    },
    email: {
        type: String,
        required: [true, "Please enter your email."],
        unique: true,
        lowercase: [validator.isMail, "Please enter a valid email address."]
    },
    password: {
        type: String,
        required: [true, "Please enter your password."],
        minlength: [6, "Your password must be at least 6 characters long."],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpired: Date
})

// Encript the password before saving the user to the database
useSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next()
    } else {
        this.password = await bcrypt.hash(this.password, 10)
    }
})

module.exports = mongoose.model("User", useSchema)