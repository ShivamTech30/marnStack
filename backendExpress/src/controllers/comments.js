
const Comments = require("../model/comments")
const catchAsyncErrors = require("../middleware/catchAsynErrors");
const Users = require("../model/registor")
const { ObjectId } = require('bson');


exports.commentDetails = catchAsyncErrors(async (req, res, next) => {
    const { comment_message,
        user_id,
        product_id,
        parent_id ,createdBy} = req.body
    console.log("smdvjsd----------", parent_id)

    const commentData = await Comments.create({
        comment_message,
        user_id,
        product_id,
        parent_id,
        createdBy,
        paidAt: Date.now(),
    })

    res.status(201).json({
        success: true,
        commentData
    })
})


exports.getCommentDetails = catchAsyncErrors(async (req, res, next) => {

    let productId = req.query.product_id
    var commentsAllDetails = await Comments.aggregate([
        {

            '$match': {
                'product_id': new ObjectId(productId)
            }

        }, {
            '$lookup': {
                'from': 'registers',
                'localField': 'user_id',
                'foreignField': '_id',
                'as': 'userDetails'
            }
        }, {
            '$addFields': {
                'userDetails': {
                    '$first': '$userDetails.email'
                },
                'name': {
                    '$first': '$userDetails.name'
                }
            }

        },
        {
            '$lookup': {
                'from': 'comments',
                'localField': '_id',
                'foreignField': 'parent_id',
                'as': 'replyChat'
            }

        }, {
            '$match': {
                '$and': [
                  {
                    'parent_id': {
                      '$exists': false
                    }
                  }
                ]
              }
        }
    ])
    
   let response = await Users.populate(commentsAllDetails, {path: "replyChat.user_id"});

    res.status(201).json({
        success: true,
        CommentsAllDetails:response 
    })


})