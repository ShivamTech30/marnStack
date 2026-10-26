import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
import { toast } from "react-toastify";
import Carosel from "./Carosel";
import LodingSpiner from "../Components/LodingSpiner";
import Popup from "reactjs-popup";

import { apiService } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const [loadspiner, setLoadSpiner] = useState(false);
  const [popupture, setPopupTure] = useState(false);
  const [forgetemail, setForgetEmail] = useState("");
  const navigate = useNavigate();

  const SendOtp = async (e) => {
    if (e) e.preventDefault();

    if (!email || !password) {
      toast.warn("Please enter both email and password");
      return;
    }

    setLoadSpiner(true);
    try {
      const response = await apiService.login({
        email,
        password,
      });

      if (response?.token) {
        reactLocalStorage.set("token", response.token);
        const uid = response?.details?._id || response?.user?._id;
        if (uid) reactLocalStorage.set("userId", uid);
        toast.success("Signed in successfully!");
        navigate("/ecommerce/addproduct");
      }
    } catch (err) {
      toast.error(err.parsedMessage || "Login failed. Please check your credentials.");
    } finally {
      setLoadSpiner(false);
    }
  };

  const ForgotEmailFun = async (e) => {
    if (e) e.preventDefault();
    if (!forgetemail) {
      toast.warn("Please enter your email address");
      return;
    }

    setLoadSpiner(true);
    try {
      await apiService.forgotPassword(forgetemail);
      toast.success("Password reset instructions sent to your email");
      setForgetEmail("");
      setPopupTure(false);
    } catch (err) {
      toast.error(err.parsedMessage || "Failed to process request");
    } finally {
      setLoadSpiner(false);
    }
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        SendOtp();
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  return (
    <div className="auth-split-wrapper">
      {/* Left side brand showcase */}
      <div className="auth-brand-side d-none d-lg-flex">
        <Carosel />
      </div>

      {/* Right side login form */}
      <div className="auth-form-side">
        <div className="auth-card-inner">
          {/* Mobile brand header */}
          <div className="d-flex d-lg-none align-items-center gap-2 mb-4">
            <div className="brand-icon" style={{ width: 36, height: 36, fontSize: 18 }}>🛍️</div>
            <span className="brand-title" style={{ fontSize: 18, color: "#0f172a" }}>ShopSphere</span>
          </div>

          <div className="auth-form-header">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-light border text-primary fw-semibold mb-3" style={{ fontSize: 12 }}>
              <span>🔐 Secure Portal</span>
            </div>
            <h2 className="auth-form-title">Welcome back</h2>
            <p className="auth-form-subtitle">
              Don't have an account yet?{" "}
              <Link to="/signup" className="fw-bold text-primary">
                Create one now &rarr;
              </Link>
            </p>
          </div>

          <form onSubmit={SendOtp}>
            <div className="form-group-modern">
              <label className="form-label-modern">Email Address</label>
              <div className="position-relative">
                <input
                  type="email"
                  className="form-control-modern"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group-modern">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label-modern m-0">Password</label>
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none text-muted"
                  style={{ fontSize: 12, fontWeight: 600 }}
                  onClick={() => setPopupTure(true)}
                >
                  Forgot password?
                </button>
              </div>
              <div className="position-relative">
                <input
                  type={showpassword ? "text" : "password"}
                  className="form-control-modern"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingRight: 45 }}
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted pe-3 text-decoration-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ border: "none", background: "none" }}
                  aria-label={showpassword ? "Hide password" : "Show password"}
                >
                  {showpassword ? (
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-auth-submit" disabled={loadspiner}>
              {loadspiner ? "Signing in..." : "Sign In to Store"}
            </button>
          </form>

          <div className="mt-4 pt-3 text-center border-top">
            <span style={{ fontSize: 13, color: "#94a3b8" }}>
              Protected by standard industry-grade SSL encryption.
            </span>
          </div>
        </div>
      </div>

      <LodingSpiner loadspiner={loadspiner} />

      {/* Forgot Password Modal */}
      <Popup open={popupture} onClose={() => setPopupTure(false)} modal>
        <div className="p-4 bg-white rounded-4 shadow-lg position-relative" style={{ maxWidth: 440, width: "90vw" }}>
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-3"
            onClick={() => setPopupTure(false)}
            aria-label="Close"
          ></button>
          <div className="text-center mb-3">
            <div className="brand-icon mx-auto mb-2" style={{ width: 44, height: 44, fontSize: 22 }}>
              🔑
            </div>
            <h4 className="fw-bold">Reset Password</h4>
            <p className="text-muted" style={{ fontSize: 13 }}>
              Enter your registered email address and we'll send a link to recover your account.
            </p>
          </div>
          <form onSubmit={ForgotEmailFun}>
            <div className="form-group-modern mb-3">
              <label className="form-label-modern">Email Address</label>
              <input
                type="email"
                className="form-control-modern"
                placeholder="you@domain.com"
                value={forgetemail}
                onChange={(e) => setForgetEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-auth-submit mt-2" disabled={loadspiner}>
              Send Recovery Link
            </button>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default Login;
