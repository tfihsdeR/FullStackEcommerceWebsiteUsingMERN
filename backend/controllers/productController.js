const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

//#region General Queries

// Create a new Product => /api/v1/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

// Get All Products => /api/v1/admin/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4
    const productsCount = await Product.countDocuments()

    const apiFeatures = new APIFeatures(Product, req.query)
        .search()
        .filter()

    let products = await apiFeatures.query

    const filteredProductsCount = products.length

    const newApiFeatures = new APIFeatures(Product, req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    products = await newApiFeatures.query;

    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })
})

// Get single Product by Id => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    } else {
        res.status(200).json({
            success: true,
            product
        })
    }
})

// Create review => /api/v1/review
exports.createReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    const isReviewed = await product.reviews.find(r => r.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.rating = rating
                review.comment = comment
            }
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(201).json({
        success: true,
    })
})

// Get all reviews of a product
exports.getReviewsOfAProdcut = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})
//#endregion

//#region Admin Queries

// Update a Product by Id => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    } else {
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            product
        })
    }
})

// Delete a Product by Id => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    } else {
        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted"
        })
    }
})

// Delete a review of a product by id - ADMIN => /api/v1/admin/product/review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    const reviews = await product.reviews.filter(review => review._id.toString() === req.query.reviewId.toString())
    const numOfReviews = reviews.length
    const ratings = await product.reviews.reduce((acc, review) => review.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, { reviews, ratings, numOfReviews }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Review deleted"
    })
})
//#endregion