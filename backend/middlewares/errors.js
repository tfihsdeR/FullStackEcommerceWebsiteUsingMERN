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

        res.status(error.statusCode).json({
            succuss: false,
            message: error.message || "Server Error"
        })
    }
}