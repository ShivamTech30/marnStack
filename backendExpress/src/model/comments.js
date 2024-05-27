const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const comments = new Schema({

    comment_message: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        required: true

    },
    parent_id: {
        type: Schema.Types.ObjectId,
        // type: String,
        // default: null
        // required: true 
    },

}, {
    timestamps: true
})


const Comments = mongoose.model("comments", comments)
module.exports = Comments