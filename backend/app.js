const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cookieParser());

// Import all routes
const products = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");

app.use("/api/v1", products);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Middleware to handle
app.use(errorMiddleware);

module.exports = app