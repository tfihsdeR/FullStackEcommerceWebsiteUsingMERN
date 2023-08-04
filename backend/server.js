const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

const connectDatabase = require("./config/database")

// Handle Uncaught Exception
process.on("uncaughtException", err => {
    if (process.env.NODE_ENV === "PRODUCTION") {
        console.log(`Error: ${err.message}`);
        console.log("Shutting down the server due to Unhandled Promise Exception");
    } else {
        console.log(`Error: ${err.message}\n\nStack: ${err.stack}`);
    }

    process.exit(1);
})

// Setting up config file
dotenv.config({ path: "backend/config/config.env" })

// Connecting to database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});

// Handle Unhandled Promise Exceptions
process.on("unhandledRejection", err => {
    if (process.env.NODE_ENV === "PRODUCTION") {
        console.log(`Error: ${err.message}`);
        console.log("Shutting down the server due to Unhandled Promise Exception");
    } else {
        console.log(`Error: ${err.message}\n\nStack: ${err.stack}`);
    }
    server.close(() => process.exit(1));
});

// Handle MongoParseError Exception
process.on("uncaughtException", err => {
    if (process.env.NODE_ENV === "PRODUCTION") {
        console.log(`Error: ${err.message}`);
        console.log("Shutting down the server due to uncaughtException Exception");
    } else {
        console.log(`Error: ${err.message}\n\nStack: ${err.stack}`);
    }
    server.close(() => process.exit(1));
})