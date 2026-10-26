import React from 'react';

const Carosel = () => {
    return (
        <div className="auth-brand-side h-100 d-flex flex-column justify-content-between p-5">
            {/* Top brand header */}
            <div className="auth-brand-logo d-flex align-items-center gap-3">
                <div className="brand-icon" style={{ width: 44, height: 44, fontSize: 22 }}>
                    🛍️
                </div>
                <div>
                    <h4 className="text-white fw-bold m-0" style={{ letterSpacing: "-0.02em" }}>ShopSphere</h4>
                    <span style={{ fontSize: "12px", color: "#a5b4fc", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        Next-Gen Commerce
                    </span>
                </div>
            </div>

            {/* Middle hero content with carousel */}
            <div className="auth-hero-content my-auto py-4">
                <div className="auth-hero-pill">
                    <span>✨ All-in-one Store Management</span>
                </div>
                <h1 className="auth-hero-title">
                    Manage Products, <br />
                    <span>Engage Buyers</span>, <br />
                    Grow Faster.
                </h1>
                <p className="auth-hero-desc">
                    Experience a unified platform to create product listings, track customer wishlists, and host real-time community discussions.
                </p>

                {/* Feature highlight cards */}
                <div className="auth-feature-cards">
                    <div className="auth-feature-card">
                        <div className="auth-feature-card-icon">⚡</div>
                        <h5>Instant Inventory</h5>
                        <p>Upload photos, set prices, and list products in seconds.</p>
                    </div>
                    <div className="auth-feature-card">
                        <div className="auth-feature-card-icon">💬</div>
                        <h5>Live Discussions</h5>
                        <p>Threaded customer comments and real-time interaction.</p>
                    </div>
                    <div className="auth-feature-card">
                        <div className="auth-feature-card-icon">❤️</div>
                        <h5>Smart Wishlists</h5>
                        <p>Keep track of customer favorites and trending items.</p>
                    </div>
                    <div className="auth-feature-card">
                        <div className="auth-feature-card-icon">🔒</div>
                        <h5>Secure &amp; Scalable</h5>
                        <p>Encrypted sessions with robust JWT authentication.</p>
                    </div>
                </div>
            </div>

            {/* Bottom trust footer */}
            <div className="d-flex align-items-center justify-content-between pt-4 border-top border-secondary border-opacity-25 text-white-50" style={{ fontSize: "13px" }}>
                <span>&copy; {new Date().getFullYear()} ShopSphere Inc.</span>
                <span className="d-flex align-items-center gap-2">
                    <span className="badge rounded-pill bg-success bg-opacity-25 text-success border border-success border-opacity-50 px-2 py-1">
                        ● All Systems Operational
                    </span>
                </span>
            </div>
        </div>
    );
};

export default Carosel;