import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Admin/Sidebar";
import Header from "../Admin/Header";
import { useEffect, useState } from "react";
import { GetAllProduct, PatchCart } from "../Redux/action/ApiCollection";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";

const WishListDetails = () => {
    const [wishListProductDetails, setWishListProductDetails] = useState([]);
    const [singleProductDetails, setSingleProductDetails] = useState(null);
    const [singleProductDetailsPopup, setSingleProductDetailsPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    const ToggleFunData = useSelector(state => state.ToggleSideBarReducer.ToggleSideBarData);
    const HeaderToggleClassAddData = useSelector((state) => state.HeaderToggleClassAddReducer.HeaderToggleClassAddData);
    const GetAllProductData = useSelector((state) => state.GetAllProductReducer.GetAllProductData?.data);

    useEffect(() => {
        setIsLoading(true);
        dispatch(GetAllProduct())
            .finally(() => setIsLoading(false));
    }, [dispatch]);

    useEffect(() => {
        const rawList = Array.isArray(GetAllProductData) ? GetAllProductData : GetAllProductData?.data || [];
        const WishListFilterData = rawList.filter((item) => item.fav === true);
        setWishListProductDetails(WishListFilterData);
        if (GetAllProductData) {
            setIsLoading(false);
        }
    }, [GetAllProductData]);

    const RemoveFromWishlist = (e, items) => {
        e.stopPropagation();
        const updatedItem = { ...items, fav: false };
        setWishListProductDetails(prev => prev.filter(item => item._id !== items._id));
        dispatch(PatchCart(updatedItem));
        toast.info(`"${items.product_name}" removed from Wishlist.`);
    };

    const SingleProductDetailsFun = (items) => {
        setSingleProductDetails(items);
        setSingleProductDetailsPopup(true);
    };

    return (
        <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
            <Header />
            <div className={`dashboard-part ${HeaderToggleClassAddData}`}>
                <Sidebar />
                <div className="content-sec">
                    {/* Page Header */}
                    <div className="page-hero-header">
                        <div>
                            <h2 className="page-title">My Saved Wishlist</h2>
                            <p className="page-subtitle">
                                Your favorite items saved for later. Quick purchase or move to cart anytime.
                            </p>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 px-3 py-2 rounded-pill fw-bold">
                                ❤️ {wishListProductDetails.length} {wishListProductDetails.length === 1 ? "Item" : "Items"} Saved
                            </span>
                            <Link to="/ecommerce/productdetails" className="btn btn-outline-primary rounded-pill px-3 py-2 fw-semibold" style={{ fontSize: 13 }}>
                                &larr; Back to Catalog
                            </Link>
                        </div>
                    </div>

                    {/* Content Section */}
                    {isLoading ? (
                        <div className="row g-4">
                            {[1, 2, 3].map((n) => (
                                <div className="col-xl-4 col-md-6 col-12" key={n}>
                                    <div className="modern-product-card p-3 shadow-sm placeholder-glow border-0">
                                        <div className="placeholder rounded-4 w-100 mb-3" style={{ height: 240, background: "#e2e8f0" }}></div>
                                        <div className="placeholder col-4 rounded-pill mb-2 py-2" style={{ background: "#e0e7ff" }}></div>
                                        <div className="placeholder col-8 rounded mb-3 py-2"></div>
                                        <div className="placeholder col-5 rounded mb-4 py-2" style={{ background: "#d1fae5" }}></div>
                                        <div className="d-flex gap-2">
                                            <div className="placeholder col-6 rounded-3 py-3" style={{ background: "#c7d2fe" }}></div>
                                            <div className="placeholder col-6 rounded-3 py-3" style={{ background: "#f1f5f9" }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : wishListProductDetails && wishListProductDetails.length > 0 ? (
                        <div className="row g-4">
                            {wishListProductDetails.map((items) => {
                                const isVideo = items?.product_image?.split(".").pop() === "mp4";

                                return (
                                    <div className="col-xl-4 col-md-6 col-12" key={items?._id || items?.product_name}>
                                        <div className="modern-product-card">
                                            {/* Media */}
                                            <div
                                                className="card-media-wrapper cursor-pointer"
                                                onClick={() => SingleProductDetailsFun(items)}
                                            >
                                                {!isVideo ? (
                                                    <img
                                                        src={items?.product_image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80"}
                                                        alt={items?.product_name}
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <video controls loop muted autoPlay>
                                                        <source src={items?.product_image} type="video/mp4" />
                                                    </video>
                                                )}

                                                {/* Floating Remove Heart Button */}
                                                <button
                                                    type="button"
                                                    className="floating-fav-btn"
                                                    onClick={(e) => RemoveFromWishlist(e, items)}
                                                    title="Remove from wishlist"
                                                    aria-label="Remove from wishlist"
                                                >
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        fill="#ef4444"
                                                        stroke="#ef4444"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Details */}
                                            <div className="card-body-content">
                                                <span className="product-brand-badge">
                                                    {items?.product_brand || "BRAND"}
                                                </span>

                                                <h3
                                                    className="product-title cursor-pointer"
                                                    onClick={() => SingleProductDetailsFun(items)}
                                                    title={items?.product_name}
                                                >
                                                    {items?.product_name}
                                                </h3>

                                                <div className="product-price-row">
                                                    <span className="product-price-amount">
                                                        ₹{Number(items?.product_price || 0).toLocaleString()}
                                                    </span>
                                                    <span className="text-muted" style={{ fontSize: "12px" }}>
                                                        In Stock
                                                    </span>
                                                </div>

                                                <div className="card-actions-row">
                                                    <button
                                                        type="button"
                                                        className="btn btn-buy-now"
                                                        onClick={() => toast.success(`Order placed for ${items.product_name}!`)}
                                                    >
                                                        Buy Now
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-add-cart"
                                                        onClick={() => toast.success(`Added ${items.product_name} to cart!`)}
                                                    >
                                                        Add Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="modern-form-card text-center py-5">
                            <span style={{ fontSize: "56px" }}>❤️</span>
                            <h3 className="fw-bold mt-3">Your Wishlist is Empty</h3>
                            <p className="text-muted" style={{ maxWidth: 420, margin: "10px auto 24px" }}>
                                You haven't added any items to your wishlist yet. Explore our products catalogue and click the heart icon to save products here!
                            </p>
                            <Link to="/ecommerce/productdetails" className="btn-publish text-decoration-none">
                                🛍️ Explore Store Catalogue
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Preview Modal */}
            <Popup
                open={singleProductDetailsPopup}
                onClose={() => setSingleProductDetailsPopup(false)}
                modal
            >
                <div className="p-4 bg-white rounded-4 shadow-xl position-relative" style={{ maxWidth: 500, width: "90vw" }}>
                    <button
                        type="button"
                        className="btn-close position-absolute top-0 end-0 m-3"
                        onClick={() => setSingleProductDetailsPopup(false)}
                        aria-label="Close"
                    ></button>

                    {singleProductDetails && (
                        <div>
                            <div className="rounded-3 overflow-hidden mb-3" style={{ height: 260, background: "#f1f5f9" }}>
                                <img
                                    src={singleProductDetails?.product_image}
                                    alt={singleProductDetails?.product_name}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <span className="product-brand-badge mb-2">
                                {singleProductDetails?.product_brand}
                            </span>
                            <h4 className="fw-bold mb-2">{singleProductDetails?.product_name}</h4>
                            <div className="d-flex align-items-baseline gap-2 mb-3">
                                <span className="product-price-amount" style={{ fontSize: 24 }}>
                                    ₹{Number(singleProductDetails?.product_price || 0).toLocaleString()}
                                </span>
                                <span className="text-muted" style={{ fontSize: 13 }}>Taxes included</span>
                            </div>
                            <div className="d-flex gap-2">
                                <button
                                    type="button"
                                    className="btn btn-buy-now flex-fill py-2"
                                    onClick={() => {
                                        toast.success(`Purchased ${singleProductDetails.product_name}!`);
                                        setSingleProductDetailsPopup(false);
                                    }}
                                >
                                    Proceed to Checkout
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-add-cart flex-fill py-2"
                                    onClick={() => {
                                        toast.success(`Added ${singleProductDetails.product_name} to cart!`);
                                        setSingleProductDetailsPopup(false);
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Popup>
        </div>
    );
};

export default WishListDetails;