import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Carosel from "./Carosel";
import LodingSpiner from "../Components/LodingSpiner";

import { apiService } from "../services/api";

const SignUp = () => {
  const [name, setName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("+91");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [BusinessActive, setBusinessActive] = useState("USER");
  const [showpassword, setShowPassword] = useState(false);
  const [loadspiner, setLoadSpiner] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    if (e) e.preventDefault();

    if (!name || !email || !password || !confirmpassword) {
      toast.warn("Please fill in all required fields");
      return;
    }

    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoadSpiner(true);
    try {
      const response = await apiService.register({
        name: name.trim(),
        number: phonenumber,
        email: email.trim().toLowerCase(),
        password,
        confirmpassword,
        role: BusinessActive,
      });

      if (response) {
        toast.success(response.message || "Account registered successfully! Please sign in.");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.parsedMessage || "Registration failed. Please try again.");
    } finally {
      setLoadSpiner(false);
    }
  };

  return (
    <div className="auth-split-wrapper">
      {/* Left side brand hero */}
      <div className="auth-brand-side d-none d-lg-flex">
        <Carosel />
      </div>

      {/* Right side registration form */}
      <div className="auth-form-side">
        <div className="auth-card-inner">
          {/* Mobile brand header */}
          <div className="d-flex d-lg-none align-items-center gap-2 mb-4">
            <div className="brand-icon" style={{ width: 36, height: 36, fontSize: 18 }}>🛍️</div>
            <span className="brand-title" style={{ fontSize: 18, color: "#0f172a" }}>ShopSphere</span>
          </div>

          <div className="auth-form-header mb-4">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-light border text-primary fw-semibold mb-2" style={{ fontSize: 12 }}>
              <span>🚀 Fast Onboarding</span>
            </div>
            <h2 className="auth-form-title">Create your account</h2>
            <p className="auth-form-subtitle">
              Already have an account?{" "}
              <Link to="/login" className="fw-bold text-primary">
                Sign in &rarr;
              </Link>
            </p>
          </div>

          {/* Account Role Selector */}
          <div className="mb-4">
            <label className="form-label-modern mb-2">Account Type</label>
            <div className="d-flex gap-2 p-1 bg-light rounded-pill border">
              <button
                type="button"
                className={`btn flex-fill rounded-pill py-2 font-weight-bold ${
                  BusinessActive === "USER"
                    ? "btn-primary shadow-sm"
                    : "btn-light text-muted"
                }`}
                style={{ fontSize: "13px", fontWeight: 700 }}
                onClick={() => setBusinessActive("USER")}
              >
                👤 Customer / Buyer
              </button>
              <button
                type="button"
                className={`btn flex-fill rounded-pill py-2 font-weight-bold ${
                  BusinessActive === "STORE_OWNER"
                    ? "btn-primary shadow-sm"
                    : "btn-light text-muted"
                }`}
                style={{ fontSize: "13px", fontWeight: 700 }}
                onClick={() => setBusinessActive("STORE_OWNER")}
              >
                🏪 Merchant / Store
              </button>
            </div>
          </div>

          <form onSubmit={handleRegister}>
            <div className="form-group-modern">
              <label className="form-label-modern">Full Name</label>
              <input
                type="text"
                className="form-control-modern"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group-modern">
              <label className="form-label-modern">Phone Number</label>
              <PhoneInput
                country={"in"}
                value={phonenumber}
                onChange={(phone) => setPhoneNumber(phone)}
                inputStyle={{
                  width: "100%",
                  height: 48,
                  borderRadius: "12px",
                  borderColor: "#e2e8f0",
                  backgroundColor: "#f8fafc",
                  fontSize: "14px",
                }}
                buttonStyle={{
                  borderRadius: "12px 0 0 12px",
                  borderColor: "#e2e8f0",
                  backgroundColor: "#f1f5f9",
                }}
              />
            </div>

            <div className="form-group-modern">
              <label className="form-label-modern">Email Address</label>
              <input
                type="email"
                className="form-control-modern"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="row g-2">
              <div className="col-md-6 form-group-modern">
                <label className="form-label-modern">Password</label>
                <div className="position-relative">
                  <input
                    type={showpassword ? "text" : "password"}
                    className="form-control-modern"
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6 form-group-modern">
                <label className="form-label-modern">Confirm Password</label>
                <input
                  type={showpassword ? "text" : "password"}
                  className="form-control-modern"
                  placeholder="Repeat password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="showPassCheckbox"
                checked={showpassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <label className="form-check-label text-muted" htmlFor="showPassCheckbox" style={{ fontSize: 13 }}>
                Show passwords
              </label>
            </div>

            <button type="submit" className="btn-auth-submit mt-3" disabled={loadspiner}>
              {loadspiner ? "Creating Account..." : "Create Account &rarr;"}
            </button>
          </form>

          <div className="mt-4 pt-3 text-center border-top">
            <span style={{ fontSize: 12, color: "#94a3b8" }}>
              By creating an account, you agree to our Terms of Service &amp; Privacy Policy.
            </span>
          </div>
        </div>
      </div>

      <LodingSpiner loadspiner={loadspiner} />
    </div>
  );
};

export default SignUp;
