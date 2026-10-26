import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Admin/Sidebar";
import Header from "../Admin/Header";
import { useEffect, useState } from "react";
import { DeleteCart, GetAllProduct, GetComment, PatchCart, PostComment } from "../Redux/action/ApiCollection";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast } from "react-toastify";
import "./index.css";

const ProductDetails = () => {
    const [AllProductDetails, setAllProductDetails] = useState([]);
    const [activeSort, setActiveSort] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [commentValue, setCommentValue] = useState("");
    const [commentReplyValue, setCommentReplyValue] = useState(false);
    const [mentionReplyValue, setMentionReplyValue] = useState("");
    const [viewCommentToggle, setViewCommentToggle] = useState({
        viewComment: "",
        viewValue: ""
    });

    const dispatch = useDispatch();
    const userId = reactLocalStorage.get("userId", false);

    const ToggleFunData = useSelector(state => state.ToggleSideBarReducer.ToggleSideBarData);
    const HeaderToggleClassAddData = useSelector((state) => state.HeaderToggleClassAddReducer.HeaderToggleClassAddData);
    const GetAllProductData = useSelector((state) => state.GetAllProductReducer.GetAllProductData?.data);
    const GetAllCommentData = useSelector((state) => state.GetCommentsReducer?.GetCommentsData);

    useEffect(() => {
        setIsLoading(true);
        dispatch(GetAllProduct())
            .finally(() => setIsLoading(false));
    }, [dispatch]);

    useEffect(() => {
        if (GetAllProductData) {
            setAllProductDetails(Array.isArray(GetAllProductData) ? GetAllProductData : GetAllProductData?.data || []);
            setIsLoading(false);
        }
    }, [GetAllProductData]);

    const ShortingFun = async (sortType) => {
        setActiveSort(sortType);
        setIsLoading(true);
        try {
            await dispatch(GetAllProduct(sortType === "all" ? "" : sortType));
        } finally {
            setIsLoading(false);
        }
    };

    const FavProductFun = (items) => {
        let updatedItem = null;
        const newProducts = AllProductDetails?.map((item) => {
            if (item._id === items._id) {
                const newFav = !item.fav;
                updatedItem = { ...item, fav: newFav };
                if (newFav) {
                    toast.success(`"${item.product_name}" added to Wishlist!`);
                } else {
                    toast.info(`"${item.product_name}" removed from Wishlist.`);
                }
                return updatedItem;
            }
            return item;
        });

        setAllProductDetails(newProducts);
        if (updatedItem) {
            dispatch(PatchCart(updatedItem));
        }
    };

    const DeleteProductHandler = (e, items) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to delete "${items.product_name}"?`)) {
            dispatch(DeleteCart(items));
            toast.success("Product deleted successfully");
        }
    };

    const onChangeCommentFun = (e, items) => {
        setCommentValue(e.target.value);
        setViewCommentToggle({
            viewComment: items?._id,
            viewValue: items?._id
        });
    };

    const CommentSubmitFun = async (e, items) => {
        if (e) e.preventDefault();
        if (!commentValue.trim()) return;

        if (commentReplyValue?.replyeValue === false || !commentReplyValue) {
            const parentCommentPayload = {
                comment_message: commentValue,
                user_id: userId,
                product_id: items?._id,
                parent_id: ""
            };
            await dispatch(PostComment(parentCommentPayload));
        } else {
            const childCommentPayload = {
                comment_message: commentValue,
                user_id: userId,
                product_id: items?._id,
                parent_id: commentReplyValue?.childReplyDataItem?._id === undefined 
                    ? commentReplyValue?.parentReplyDataItem?._id 
                    : commentReplyValue?.childReplyDataItem?.parent_id,
                createdBy: userId
            };
            await dispatch(PostComment(childCommentPayload));
        }

        setCommentValue("");
        setCommentReplyValue(false);
        setMentionReplyValue("");
        toast.success("Comment posted!");
        dispatch(GetComment(items?._id));
    };

    const ViewCommentFun = (e, items) => {
        if (viewCommentToggle.viewComment === items?._id) {
            // Toggle close
            setViewCommentToggle({ viewComment: "", viewValue: "" });
        } else {
            setViewCommentToggle({
                viewComment: items?._id,
                viewValue: ""
            });
            dispatch(GetComment(items?._id));
        }
    };

    const ReplyFun = (e, items, Comment_item) => {
        setViewCommentToggle({
            viewComment: items?._id,
            viewValue: items?._id
        });

        if (!Comment_item.name) {
            setMentionReplyValue(`@${Comment_item?.user_id?.name || "user"}`);
            setCommentValue(`@${Comment_item?.user_id?.name || "user"} `);
            setCommentReplyValue({
                replyeValue: true,
                childReplyDataItem: Comment_item
            });
        } else {
            setMentionReplyValue(`@${Comment_item.name}`);
            setCommentValue(`@${Comment_item.name} `);
            setCommentReplyValue({
                replyeValue: true,
                parentReplyDataItem: Comment_item
            });
        }
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
                            <h2 className="page-title">Products Catalogue</h2>
                            <p className="page-subtitle">
                                Browse store items, save to wishlist, and engage with customer reviews.
                            </p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-white text-dark border shadow-sm px-3 py-2 rounded-pill fw-bold">
                                📦 {AllProductDetails?.length || 0} Products Total
                            </span>
                        </div>
                    </div>

                    {/* Sorting & Filter Toolbar */}
                    <div className="filter-toolbar">
                        <div className="d-flex align-items-center gap-2">
                            <span style={{ fontSize: "13px", fontWeight: "700", color: "#475569" }}>Sort By:</span>
                            <div className="sort-pill-group">
                                <button
                                    type="button"
                                    className={`sort-pill ${activeSort === "all" ? "active" : ""}`}
                                    onClick={() => ShortingFun("all")}
                                >
                                    Default
                                </button>
                                <button
                                    type="button"
                                    className={`sort-pill ${activeSort === "asending" ? "active" : ""}`}
                                    onClick={() => ShortingFun("asending")}
                                >
                                    Price: Low to High &uarr;
                                </button>
                                <button
                                    type="button"
                                    className={`sort-pill ${activeSort === "decending" ? "active" : ""}`}
                                    onClick={() => ShortingFun("decending")}
                                >
                                    Price: High to Low &darr;
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Cards Grid or Skeleton Loader */}
                    {isLoading ? (
                        <div className="row g-4">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
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
                    ) : AllProductDetails && AllProductDetails.length > 0 ? (
                        <div className="row g-4">
                            {AllProductDetails.map((items) => {
                                const isVideo = items?.product_image?.split(".").pop() === "mp4";
                                const isCommentOpen = viewCommentToggle.viewComment === items?._id;

                                return (
                                    <div className="col-xl-4 col-md-6 col-12" key={items?._id || items?.product_name}>
                                        <div className="modern-product-card">
                                            {/* Media Container */}
                                            <div className="card-media-wrapper">
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

                                                {/* Floating Wishlist Button */}
                                                <button
                                                    type="button"
                                                    className="floating-fav-btn"
                                                    onClick={() => FavProductFun(items)}
                                                    title={items.fav ? "Remove from wishlist" : "Add to wishlist"}
                                                    aria-label="Toggle Wishlist"
                                                >
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        fill={items.fav ? "#ef4444" : "none"}
                                                        stroke={items.fav ? "#ef4444" : "#64748b"}
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Card Details */}
                                            <div className="card-body-content">
                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                    <span className="product-brand-badge">
                                                        {items?.product_brand || "BRAND"}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-link text-danger p-0 text-decoration-none"
                                                        title="Delete Product"
                                                        onClick={(e) => DeleteProductHandler(e, items)}
                                                    >
                                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                <h3 className="product-title" title={items?.product_name}>
                                                    {items?.product_name}
                                                </h3>

                                                <div className="product-price-row">
                                                    <span className="product-price-amount">
                                                        ₹{Number(items?.product_price || 0).toLocaleString()}
                                                    </span>
                                                    <span className="text-muted" style={{ fontSize: "12px" }}>
                                                        Free Shipping
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

                                                {/* Discussion / Comments Drawer */}
                                                <div className="comment-drawer">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <button
                                                            type="button"
                                                            className="comment-toggle-btn"
                                                            onClick={(e) => ViewCommentFun(e, items)}
                                                        >
                                                            <span>💬</span>
                                                            <span>{isCommentOpen ? "Hide comments" : "Discussion & Reviews"}</span>
                                                        </button>
                                                    </div>

                                                    {/* Inline input */}
                                                    <form
                                                        onSubmit={(e) => CommentSubmitFun(e, items)}
                                                        className="comment-box-input-group"
                                                    >
                                                        <input
                                                            type="text"
                                                            placeholder={
                                                                mentionReplyValue && items?._id === viewCommentToggle?.viewComment
                                                                    ? `Replying to ${mentionReplyValue}...`
                                                                    : "Add a review or comment..."
                                                            }
                                                            value={items?._id === viewCommentToggle?.viewValue ? commentValue : ""}
                                                            onChange={(e) => onChangeCommentFun(e, items)}
                                                        />
                                                        <button type="submit">
                                                            Post
                                                        </button>
                                                    </form>

                                                    {/* Comments List */}
                                                    {isCommentOpen && (
                                                        <div className="comment-list-modern">
                                                            {GetAllCommentData?.data?.CommentsAllDetails && GetAllCommentData?.data?.CommentsAllDetails.length > 0 ? (
                                                                GetAllCommentData.data.CommentsAllDetails.map((commentItem, idx) => (
                                                                    <div className="comment-item-modern" key={commentItem._id || idx}>
                                                                        <div className="comment-header-row">
                                                                            <span className="comment-author">
                                                                                👤 {commentItem?.name || "Customer"}
                                                                            </span>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-sm btn-link p-0 text-muted"
                                                                                style={{ fontSize: "11px", textDecoration: "none" }}
                                                                                onClick={(e) => ReplyFun(e, items, commentItem)}
                                                                            >
                                                                                Reply
                                                                            </button>
                                                                        </div>
                                                                        <p className="comment-content-text">
                                                                            {commentItem?.comment_message}
                                                                        </p>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="text-center py-2 text-muted" style={{ fontSize: "12px" }}>
                                                                    No reviews yet. Be the first to comment!
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="modern-form-card text-center py-5">
                            <span style={{ fontSize: "52px" }}>🛍️</span>
                            <h4 className="fw-bold mt-3">No Products Found</h4>
                            <p className="text-muted" style={{ maxWidth: 400, margin: "8px auto 20px" }}>
                                There are currently no products in the store. Click the button below to add your first product listing.
                            </p>
                            <a href="/ecommerce/addproduct" className="btn-publish text-decoration-none">
                                + Add First Product
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;