const Product = require("../model/products");
const catchAsyncErrors = require("../middleware/catchAsynErrors");
const CartProduct = require("../model/cartProducts");

exports.cartDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        const getId = req.params.id;
        const idDetails = await Product.findById(getId);

        if (!idDetails) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        const data = {
            userId: req.user._id,
            product_id: idDetails._id,
            addToCart: true
        };
        const cartItem = await CartProduct.create(data);

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully!",
            cart: cartItem
        });
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message || "Failed to add to cart" });
    }
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        const get_id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(get_id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        // Also clean up any associated cart items
        await CartProduct.deleteMany({ product_id: get_id });

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct
        });
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message || "Failed to delete product" });
    }
});

exports.allCartDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        const userDetails = await CartProduct.find({ userId: req.user._id }).populate("product_id");
        return res.status(200).json({ success: true, data: userDetails });
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message || "Failed to fetch cart details" });
    }
});

exports.PatchCartDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        const get_id = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(get_id, req.body, {
            new: true
        });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        // Keep CartProduct collection in sync with wishlist (fav: true/false)
        if (req.body.fav !== undefined && req.user?._id) {
            if (req.body.fav) {
                await CartProduct.findOneAndUpdate(
                    { userId: req.user._id, product_id: get_id },
                    { userId: req.user._id, product_id: get_id, addToCart: true },
                    { upsert: true, new: true }
                );
            } else {
                await CartProduct.findOneAndDelete({ userId: req.user._id, product_id: get_id });
            }
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });
    } catch (e) {
        return res.status(500).json({ success: false, error: e.message || "Failed to update product" });
    }
});