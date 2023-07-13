const app = require("./app");
const connectDatabase = require("./config/database")

const dotenv = require("dotenv");

// Setting up config file
dotenv.config({ path: "backend/config/config.env" })

// Handle Uncaught Exception
process.on("uncaughtException", err => {
    if (process.env.NODE_ENV === "PRODUCTION") {
        console.log(`Error: ${err.message}`);
        console.log("Shutting down the server due to Unhandled Promise Exception");
    } else {
        console.log(`Error: ${err.message}`);
        console.log(`Stack: ${err.stack}`);
    }

    process.exit(1);
})

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});

// Handle Unhandled Promise Exceptions
process.on("unhandledRejection", err => {
    if (process.env.NODE_ENV === "PRODUCTION") {
        console.log(`Error: ${err.message}`);
        console.log("Shutting down the server due to Unhandled Promise Exception");
    } else {
        console.log(`Error: ${err.message}`);
        console.log(`Stack: ${err.stack}`);
    }
    server.close(() => process.exit(1));
});

// // Handle MongoParseError Exception
// process.on("uncaughtException", err => {
//     if (process.env.NODE_ENV === "PRODUCTION") {
//         console.log(`Error: ${err.message}`);
//         console.log("Shutting down the server due to uncaughtException Exception");
//     } else {
//         console.log(`Error: ${err.message}`);
//         console.log(`Stack: ${err.stack}`);
//     }
//     server.close(() => process.exit(1));
// })