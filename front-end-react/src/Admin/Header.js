import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const pageData = [
    { label: "📦 Add New Product", value: "/ecommerce/addproduct" },
    { label: "🛍️ Products Catalog", value: "/ecommerce/productdetails" },
    { label: "❤️ Saved Wishlist", value: "/ecommerce/wishlist" },
  ];

  useEffect(() => {
    if (selectedOption?.value) {
      navigate(selectedOption.value);
      setSelectedOption(null);
    }
  }, [selectedOption, navigate]);

  const Logoutfun = () => {
    reactLocalStorage.remove("token");
    reactLocalStorage.remove("Admin_Role");
    reactLocalStorage.remove("userId");
    reactLocalStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/ecommerce/addproduct":
        return "Add Product";
      case "/ecommerce/productdetails":
        return "Product Details";
      case "/ecommerce/wishlist":
        return "Wishlist";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="adminheader-bar">
      <div className="left-part">
        <div className="d-none d-md-flex flex-column me-3">
          <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Store / {getPageTitle()}
          </span>
          <span style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>
            {getPageTitle()}
          </span>
        </div>

        <div style={{ minWidth: 260 }}>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={pageData}
            placeholder="Search pages & inventory..."
            isClearable
            styles={{
              control: (base, state) => ({
                ...base,
                borderRadius: "9999px",
                borderColor: state.isFocused ? "#6366f1" : "#e2e8f0",
                backgroundColor: "#f8fafc",
                boxShadow: state.isFocused ? "0 0 0 3px rgba(99, 102, 241, 0.15)" : "none",
                fontSize: "13px",
                fontWeight: "500",
                padding: "2px 6px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#cbd5e1",
                  backgroundColor: "#ffffff",
                },
              }),
              option: (base, state) => ({
                ...base,
                fontSize: "13px",
                fontWeight: state.isSelected ? "600" : "500",
                backgroundColor: state.isSelected
                  ? "#4f46e5"
                  : state.isFocused
                  ? "#eef2ff"
                  : "transparent",
                color: state.isSelected ? "#ffffff" : "#1e293b",
                cursor: "pointer",
                padding: "10px 14px",
              }),
              menu: (base) => ({
                ...base,
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
                border: "1px solid #e2e8f0",
                zIndex: 9999,
              }),
            }}
          />
        </div>
      </div>

      <div className="right-part">
        <ul>
          {location.pathname !== "/ecommerce/addproduct" && (
            <li className="d-none d-sm-block">
              <button
                type="button"
                className="quick-action-btn"
                onClick={() => navigate("/ecommerce/addproduct")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>Add Product</span>
              </button>
            </li>
          )}

          <li>
            <button
              type="button"
              className="btn btn-light rounded-circle p-2 position-relative"
              onClick={() => navigate("/ecommerce/wishlist")}
              title="My Wishlist"
              style={{ width: 40, height: 40, border: "1px solid #e2e8f0" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </li>

          <li className="user-part">
            <div className="dropdown">
              <div
                className="user-avatar-btn"
                id="headerUserDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span style={{ fontSize: "16px", fontWeight: "700", color: "#4f46e5" }}>
                  👤
                </span>
              </div>

              <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0" style={{ borderRadius: "16px", padding: "8px", minWidth: 200 }} aria-labelledby="headerUserDropdown">
                <li className="px-3 py-2 border-bottom mb-1">
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Signed in as</div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>Store Admin</div>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-3 py-2 fw-semibold"
                    type="button"
                    onClick={() => navigate("/ecommerce/addproduct")}
                  >
                    📦 Add Product
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-3 py-2 fw-semibold"
                    type="button"
                    onClick={() => navigate("/ecommerce/productdetails")}
                  >
                    🛍️ Product Details
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-3 py-2 fw-semibold"
                    type="button"
                    onClick={() => navigate("/ecommerce/wishlist")}
                  >
                    ❤️ Wish List
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider my-1" />
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-3 py-2 fw-bold text-danger"
                    type="button"
                    onClick={Logoutfun}
                  >
                    🚪 Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
