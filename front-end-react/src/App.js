
import "./App.css";
import { toast } from "react-toastify";
import React, { useEffect, useState } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./Components/DashboardLayout/Dashboard.css"
import "../src/Admin/Admin.css"
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import './index.css';
import 'react-phone-input-2/lib/style.css'

import SignUp from './Pages/SignUp'
import Login from './Pages/Login'

// import * as Sentry from "@sentry/react"; 
import AddProducts from "./Ecomerce/AddProducts";
import ProductDetails from "./Ecomerce/ProductDetails";
import WishListDetails from "./Ecomerce/WishListDetails";
import "../node_modules/video-react/dist/video-react.css";


function App() {


  const [isOnline, setNetwork] = useState(window.navigator.onLine);

  useEffect(() => {

    window.addEventListener("offline", () => setNetwork(window.navigator.onLine)
    );
    window.addEventListener("online", () => setNetwork(window.navigator.onLine)
    );

  }, []);

  useEffect(() => {
    if (isOnline == false) {
      toast.warn("Internet lost!");
    }

  }, [isOnline])

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<SignUp />} />       
        <Route path="/login" element={<Login />} />
       {/*  <Route path="/admin/accounting" element={<Accounting/>} />
        <Route path="/admin/invoice" element={<Invoice />} /> */}



        <Route path="/ecommerce/addproduct" element={<AddProducts />}></Route>
        <Route path="/ecommerce/productdetails" element={<ProductDetails />}></Route>
        <Route path="/ecommerce/wishlist" element={<WishListDetails/>}></Route>



      </Routes>
      <ToastContainer autoClose={2000} />
    </BrowserRouter>

  );
}

export default App

