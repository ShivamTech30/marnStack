const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const comments = new Schema({

    comment_message: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:"Register"
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
     
    interests: ["Register"],
    createdBy: { type: Schema.Types.ObjectId},
    // eventsAttended: [{ type: Schema.Types.ObjectId, ref: 'Register' }]
}, {
    timestamps: true
})


const Comments = mongoose.model("comments", comments)
module.exports = Comments