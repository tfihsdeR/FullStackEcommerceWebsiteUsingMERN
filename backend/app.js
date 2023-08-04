const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload")


const errorMiddleware = require("./middlewares/errors");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload())

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

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