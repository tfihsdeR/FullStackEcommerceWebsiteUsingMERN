const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cookieParser());

// Import all routes
const products = require("./routes/productRoutes");
const user = require("./routes/userRoutes");

app.use("/api/v1", products);
app.use("/api/v1", user);

// Middleware to handle
app.use(errorMiddleware);

module.exports = app