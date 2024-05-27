const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

const { registerDetails } = require("../controllers/loginController");
const { productDetails, allProductDetails } = require("../controllers/products");

const multer = require('multer');
const { cartDetails, allCartDetails, PatchCartDetails, deleteProduct } = require("../controllers/cart");
const { addRole, deleteRole } = require("../controllers/roles");
const  {commentDetails, getCommentDetails}  = require("../controllers/comments")


const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, 'add your local path')
    // },  this is for to save on local folder

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})



const upload = multer({
    storage: storage,
    limit: {
        fileSize: 1024 * 1024 * 5
    }
})

const router = express.Router();
router.route("/register").post(registerDetails)
router.route("/add_product").post(isAuthenticatedUser, upload.single("productImage"), productDetails)
router.route("/all_product").get(isAuthenticatedUser, allProductDetails)
router.route("/delete_product/:id").delete(isAuthenticatedUser, deleteProduct)
router.route("/add_cart/:id").get(isAuthenticatedUser, cartDetails)
router.route("/all_cart").get(isAuthenticatedUser, allCartDetails)
router.route("/patch_cart/:id").patch(isAuthenticatedUser, PatchCartDetails)
router.route("/add_role").post(addRole)
router.route("/delete_role").delete(isAuthenticatedUser, deleteRole)
router.route("/comment").post(isAuthenticatedUser, commentDetails)
router.route("/get_comment").get(isAuthenticatedUser, getCommentDetails)






module.exports = router
