const Product = require("../model/products");
const cloudinary = require("../cloudinary/cloudinary");
const catchAsyncErrors = require("../middleware/catchAsynErrors");
const CartProduct = require("../model/cartProducts");

exports.productDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({ success: false, error: "Product image is required." });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'samples/animals',
            resource_type: 'auto'
        });

        const { product_name, product_price, product_brand } = req.body;
        const product = await Product.create({
            product_name,
            product_price: Number(product_price),
            product_brand,
            product_image: result.secure_url || result.url,
            paidAt: Date.now(),
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });
    } catch (error) {
        console.error("Product upload error:", error);
        return res.status(500).json({ success: false, error: "Failed to upload product: " + error.message });
    }
});

exports.allProductDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        const userId = req.user._id;
        const userQuery = req.query.sorting;

        let sortOption = { createdAt: -1 };
        if (userQuery === "asending") {
            sortOption = { product_price: 1 };
        } else if (userQuery === "decending") {
            sortOption = { product_price: -1 };
        }

        // Fetch products and cart favorites in parallel for maximum performance
        const [ProductDetails, CartProductDetails] = await Promise.all([
            Product.find().sort(sortOption).lean().exec(),
            CartProduct.find({ userId: userId, addToCart: true }).lean().exec()
        ]);

        // O(1) set lookup instead of O(N*M) nested loop
        const favProductIds = new Set(
            CartProductDetails.map(cart => cart.product_id ? cart.product_id.toString() : "")
        );

        const formattedProducts = ProductDetails.map(product => {
            const isFav = favProductIds.has(product._id.toString()) || Boolean(product.fav);
            return {
                ...product,
                fav: isFav,
                UserId: userId
            };
        });

        return res.status(200).json({
            success: true,
            data: formattedProducts
        });
    } catch (e) {
        console.error("allProductDetails error:", e);
        return res.status(500).json({ success: false, error: e.message || "Failed to fetch products" });
    }
});