import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Admin/Sidebar";
import Header from "../Admin/Header";
import { useState } from "react";
import { PostAddProduct } from "../Redux/action/ApiCollection";
import { toast } from "react-toastify";

const AddProducts = () => {
    const [ProductName, setProductName] = useState("");
    const [ProductPrice, setProductPrice] = useState("");
    const [ProductBrand, setProductBrand] = useState("");
    const [ProductImage, setProductImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();
    const ToggleFunData = useSelector(state => state.ToggleSideBarReducer.ToggleSideBarData);
    const HeaderToggleClassAddData = useSelector((state) => state.HeaderToggleClassAddReducer.HeaderToggleClassAddData);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setProductImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const AddProductFun = async (e) => {
        if (e) e.preventDefault();

        if (!ProductName.trim()) {
            toast.warn("Please enter a product name");
            return;
        }
        if (!ProductPrice) {
            toast.warn("Please enter a product price");
            return;
        }
        if (!ProductBrand.trim()) {
            toast.warn("Please enter a brand name");
            return;
        }
        if (!ProductImage) {
            toast.warn("Please select a product image");
            return;
        }

        setIsSubmitting(true);
        try {
            const addProductPayload = {
                product_name: ProductName,
                product_price: ProductPrice,
                product_brand: ProductBrand,
                productImage: ProductImage,
                fav: false,
            };

            await dispatch(PostAddProduct(addProductPayload));
            // Reset form on completion
            setProductName("");
            setProductPrice("");
            setProductBrand("");
            setProductImage(null);
            setImagePreview(null);
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
            <Header />
            <div className={`dashboard-part ${HeaderToggleClassAddData}`}>
                <Sidebar />
                <div className="content-sec">
                    {/* Header */}
                    <div className="page-hero-header">
                        <div>
                            <h2 className="page-title">Add New Product</h2>
                            <p className="page-subtitle">Publish a new item to your store inventory with photos and pricing.</p>
                        </div>
                    </div>

                    <div className="row g-4">
                        {/* Form Column */}
                        <div className="col-lg-7">
                            <div className="modern-form-card">
                                <h4 className="fw-bold mb-4" style={{ fontSize: 18, color: "#0f172a" }}>
                                    Product Information
                                </h4>

                                <form onSubmit={AddProductFun}>
                                    <div className="form-group-modern">
                                        <label className="form-label-modern">Product Name *</label>
                                        <input
                                            type="text"
                                            className="form-control-modern"
                                            placeholder="e.g. Wireless Noise-Cancelling Headphones"
                                            value={ProductName}
                                            onChange={(e) => setProductName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-md-6 form-group-modern">
                                            <label className="form-label-modern">Brand / Manufacturer *</label>
                                            <input
                                                type="text"
                                                className="form-control-modern"
                                                placeholder="e.g. Sony, Apple, Nike"
                                                value={ProductBrand}
                                                onChange={(e) => setProductBrand(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6 form-group-modern">
                                            <label className="form-label-modern">Price (₹) *</label>
                                            <div className="position-relative">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    className="form-control-modern"
                                                    placeholder="2499"
                                                    value={ProductPrice}
                                                    onChange={(e) => setProductPrice(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group-modern mt-3">
                                        <label className="form-label-modern">Upload Media / Product Image *</label>
                                        <div className="upload-dropzone" onClick={() => document.getElementById("productFileInput").click()}>
                                            <div className="upload-dropzone-icon">
                                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                            </div>
                                            <h6 className="fw-bold mb-1">Click to select photo or video</h6>
                                            <p className="text-muted m-0" style={{ fontSize: 12 }}>
                                                Supports PNG, JPG, WEBP, or MP4 up to 5MB
                                            </p>
                                            <input
                                                id="productFileInput"
                                                type="file"
                                                className="d-none"
                                                accept="image/*,video/mp4"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-2">
                                        <button
                                            type="submit"
                                            className="btn-publish"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    <span>Publishing...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>✨ Publish to Store</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Live Preview Column */}
                        <div className="col-lg-5">
                            <div className="modern-form-card" style={{ position: "sticky", top: 100 }}>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <h5 className="fw-bold m-0" style={{ fontSize: 16 }}>Live Store Preview</h5>
                                    <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-2 py-1">
                                        Card Mockup
                                    </span>
                                </div>
                                <p className="text-muted" style={{ fontSize: 13 }}>
                                    This is how customers will see your listing on the product details page.
                                </p>

                                <div className="modern-product-card shadow-sm mx-auto" style={{ maxWidth: 320 }}>
                                    <div className="card-media-wrapper">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" />
                                        ) : (
                                            <div className="d-flex flex-column align-items-center justify-content-center text-muted">
                                                <span style={{ fontSize: 40 }}>📦</span>
                                                <span style={{ fontSize: 12, marginTop: 8 }}>No image selected</span>
                                            </div>
                                        )}
                                        <div className="floating-fav-btn">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="card-body-content">
                                        <span className="product-brand-badge">
                                            {ProductBrand.trim() || "BRAND NAME"}
                                        </span>
                                        <h4 className="product-title">
                                            {ProductName.trim() || "Your Product Name Will Appear Here"}
                                        </h4>
                                        <div className="product-price-row">
                                            <span className="product-price-amount">
                                                ₹{ProductPrice ? Number(ProductPrice).toLocaleString() : "0"}
                                            </span>
                                            <span className="text-muted" style={{ fontSize: 12 }}>incl. taxes</span>
                                        </div>

                                        <div className="card-actions-row">
                                            <button type="button" className="btn btn-buy-now">
                                                Buy Now
                                            </button>
                                            <button type="button" className="btn btn-add-cart">
                                                Add Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;