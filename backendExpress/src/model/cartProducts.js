const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const cartProductSchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref:'product',
        required: true
    },
    
    userId: {
        type: Schema.Types.ObjectId,
        required: true

    }, 
    addToCart:{
        type:Boolean,
        default:true
        // required:false
    }
},
{
    timestamps:true
})


const CartProduct = mongoose.model("CartProduct", cartProductSchema)
module.exports = CartProduct 