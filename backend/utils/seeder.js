const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/Database");
const products = require("../data/products");

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log("Products seeded");
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

// Setting dotenv file
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

seedProducts();