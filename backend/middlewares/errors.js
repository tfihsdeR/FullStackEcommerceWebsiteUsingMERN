const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;


    if (process.env.NODE_ENV === "DEVELOPMENT") {
        res.status(err.statusCode).json({
            succuss: false,
            error: err,
            message: err.message,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV === "PRODUCTION") {
        let error = { ...err };

        error.message = err.message;

        // Wrong Mongoose Object Error Handler
        if (err.name === "CastError") {
            const message = `Resource not found with id of ${err.path}`;
            error = new ErrorHandler(message, 400);
        }

        // Handling Mongoose Validation Errors
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(val => val.message);
            error = new ErrorHandler(message, 400);
        }

        // Handling Mongoose duplicate key errors
        if (err.code === 11000) {
            const message = `Dupicate ${Object.keys(err.keyValue)} entered!`
            // const message = "Duplicate field value entered";
            error = new ErrorHandler(message, 400);
        }

        // Handling wrong JWT error
        if (err.name === "JsonWebTokenError") {
            const message = "Invalid Toke. Please try again!"
            error = new ErrorHandler(message, 400);
        }

        // Handling Expired JWT error
        if (err.name === "TokenExpiredError") {
            const message = "Expired Token. Please try again!"
            error = new ErrorHandler(message, 400);
        }

        res.status(error.statusCode).json({
            succuss: false,
            message: error.message || "Server Error"
        })
    }
}