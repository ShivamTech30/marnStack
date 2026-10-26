import React, { useState } from 'react';
import { toast } from "react-toastify";
import { reactLocalStorage } from 'reactjs-localstorage';
import { useLocation, NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [toggleshowhide, setToggleShowHide] = useState(true);
    const navigate = useNavigate();
    const param = useLocation();

    const Logoutfun = () => {
        reactLocalStorage.remove('token');
        reactLocalStorage.remove('Admin_Role');
        reactLocalStorage.remove('userId');
        reactLocalStorage.clear();
        toast.success("Logged out successfully");
        navigate("/login");
    };

    const ToggleShowHideFun = () => {
        setToggleShowHide(prev => !prev);
    };

    return (
        <>
            {/* Mobile toggle bar */}
            <div className='admin-toggle d-lg-none d-flex align-items-center justify-content-between p-3 bg-dark text-white'>
                <div className='d-flex align-items-center gap-2'>
                    <div className="brand-icon" style={{ width: 34, height: 34, fontSize: 16 }}>
                        🛍️
                    </div>
                    <span className="brand-title" style={{ fontSize: 16 }}>ShopSphere</span>
                </div>
                <button
                    className='btn btn-sm btn-outline-light'
                    onClick={ToggleShowHideFun}
                    aria-label="Toggle Navigation"
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Sidebar navigation */}
            <div className={`left-part leftPartDisplayBlock ${toggleshowhide ? "d-none d-lg-flex" : "d-flex"}`}>
                <div className='adminlogo'>
                    <NavLink to="/ecommerce/productdetails" className="brand-badge">
                        <div className="brand-icon">
                            🛍️
                        </div>
                        <div className="brand-text-wrap">
                            <span className="brand-title">ShopSphere</span>
                            <span className="brand-subtitle">STORE DASHBOARD</span>
                        </div>
                    </NavLink>
                </div>

                <div className='adminmenulist'>
                    <div>
                        <div className="nav-section-title">Store Management</div>
                        <ul className='adminmenu'>
                            <li onClick={() => setToggleShowHide(true)}>
                                <NavLink
                                    to='/ecommerce/addproduct'
                                    className={param.pathname === "/ecommerce/addproduct" ? "active" : ""}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <line x1="12" y1="8" x2="12" y2="16" />
                                        <line x1="8" y1="12" x2="16" y2="12" />
                                    </svg>
                                    <span>Add Products</span>
                                </NavLink>
                            </li>
                            <li onClick={() => setToggleShowHide(true)}>
                                <NavLink
                                    to='/ecommerce/productdetails'
                                    className={param.pathname === "/ecommerce/productdetails" ? "active" : ""}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                        <line x1="3" y1="6" x2="21" y2="6" />
                                        <path d="M16 10a4 4 0 0 1-8 0" />
                                    </svg>
                                    <span>Product Details</span>
                                </NavLink>
                            </li>
                            <li onClick={() => setToggleShowHide(true)}>
                                <NavLink
                                    to='/ecommerce/wishlist'
                                    className={param.pathname === "/ecommerce/wishlist" ? "active" : ""}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                    <span>Wish List</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="sidebar-footer">
                        <div className="logout-link" onClick={Logoutfun}>
                            <a href="#logout" onClick={(e) => { e.preventDefault(); Logoutfun(); }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                <span>Sign Out</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;