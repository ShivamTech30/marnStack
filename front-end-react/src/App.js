import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";
import "../node_modules/video-react/dist/video-react.css";
import "./Admin/Admin.css";
import "./App.css";
import "./theme.css";
import "./index.css";

import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import AddProducts from "./Ecomerce/AddProducts";
import ProductDetails from "./Ecomerce/ProductDetails";
import WishListDetails from "./Ecomerce/WishListDetails";

function App() {
  const [isOnline, setNetwork] = useState(window.navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setNetwork(false);
    const handleOnline = () => setNetwork(true);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  useEffect(() => {
    if (isOnline === false) {
      toast.warn("Internet lost!");
    }
  }, [isOnline]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Pre-login routes */}
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Post-login routes */}
        <Route path="/ecommerce/addproduct" element={<AddProducts />} />
        <Route path="/ecommerce/productdetails" element={<ProductDetails />} />
        <Route path="/ecommerce/wishlist" element={<WishListDetails />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;

