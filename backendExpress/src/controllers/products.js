const Product = require("../model/products");
const cloudinary = require("../cloudinary/cloudinary")
const catchAsyncErrors = require("../middleware/catchAsynErrors");
const CartProduct = require("../model/cartProducts");

exports.productDetails = catchAsyncErrors(async (req, res, next) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    const { product_name, product_price, product_brand } = req.body
    const product = await Product.create({
        product_name,
        product_price,
        product_brand,
        product_image: result.url,
        paidAt: Date.now(),
    })

    res.status(201).json({
        success: true,
        product
    })
})

exports.allProductDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        const userId = req.user._id
        const ProductDetails = await Product.find().lean().exec();
        const CartProductDetails = await CartProduct.find({ userId: userId, addToCart: true }).lean().exec()

        // const startTime = performance.now() //performance check 
        // ProductDetails.map((items, id) => {
        //     CartProductDetails.map((cartItem) => {
        //         if (items._id.toString() == cartItem.product_id.toString()) {
        //             items['fav'] =  true 
        //         }
        //         if(items._id.toString() !== cartItem.product_id.toString() && !ProductDetails[id]['fav']){
        //             items['fav'] =  false
        //             // console.log(id)

        //         }

        //     })

        // })

        for (let i = 0; i < ProductDetails.length; i++) {
            for (j = 0; j < CartProductDetails.length; j++) {
                if (ProductDetails[i]._id.toString() == CartProductDetails[j].product_id.toString()) {
                    ProductDetails[i]['fav'] = true
                    ProductDetails[i]['UserId'] = userId
                }
                if (ProductDetails[i]._id.toString() !== CartProductDetails[j].product_id.toString()
                    && !ProductDetails[i]['fav']) {
                    ProductDetails[i]['fav'] = false
                    ProductDetails[i]['UserId'] = userId
                    //   console.log(id)

                }
            }

        }

        // const endTime = performance.now()
        // console.log("Time taken s", startTime)
        console.log("Time taken e ", ProductDetails)

        await res.status(200).json({ data: ProductDetails })
    } catch (e) {
        res.status(400).send(e)
    }


})