const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const product = new Schema({
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: String,
        required: true
    },
    product_brand: {
        type: String,
        required: true

    },
    product_image: {
        type: String,
        required: true

    },
    
})


const Product = mongoose.model("product", product)
module.exports = Product 