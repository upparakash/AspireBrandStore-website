import React, { useState } from "react";
import "./Login.css";
import logo from "../src/images/Brandstorelogo.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./redux/authSlice";

const UserAuth = () => {
  const [view, setView] = useState("login");
  const [formData, setFormData] = useState({
    fullname: "",
    emailOrPhone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const validate = () => {
    let newErrors = {};

    if (view === "signup") {
      if (!formData.fullname.trim()) newErrors.fullname = "Full name is required";
      if (!formData.emailOrPhone) newErrors.emailOrPhone = "Email or phone is required";
      if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    }

    if (view === "login") {
      if (!formData.emailOrPhone) newErrors.emailOrPhone = "Email or phone is required";
      if (!formData.password) newErrors.password = "Password is required";
    }

    if (view === "forgot") {
      if (!formData.emailOrPhone) newErrors.emailOrPhone = "Email or phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (view === "login") {
      // ✅ Use Redux to login
      const resultAction = await dispatch(loginUser({
        emailOrPhone: formData.emailOrPhone,
        password: formData.password,
      }));

      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/Home"); // navigate on success
      } else {
        alert(resultAction.payload || "Login failed");
      }
    }

    if (view === "signup") {
      alert("Signup API not connected yet");
    }

    if (view === "forgot") {
      alert("Forgot password API not connected yet");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <img src={logo} alt="logo" className="auth-logo" />

        <h3 className="auth-title">
          {view === "login" ? "LOGIN" : view === "signup" ? "SIGN UP" : "FORGOT PASSWORD"}
        </h3>

        {/* SIGNUP */}
        {view === "signup" && (
          <>
            <input name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange} />
            <p className="auth-error">{errors.fullname}</p>

            <input name="emailOrPhone" placeholder="Email or Phone" value={formData.emailOrPhone} onChange={handleChange} />
            <p className="auth-error">{errors.emailOrPhone}</p>

            <div className="password-wrapper">
              <input name="password" placeholder="Password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} />
              <span className="toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <p className="auth-error">{errors.password}</p>

            <input name="confirmPassword" placeholder="Confirm Password" type={showPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} />
            <p className="auth-error">{errors.confirmPassword}</p>
          </>
        )}

        {/* LOGIN */}
        {view === "login" && (
          <>
            <input name="emailOrPhone" placeholder="Email or Phone" value={formData.emailOrPhone} onChange={handleChange} />
            <p className="auth-error">{errors.emailOrPhone}</p>

            <div className="password-wrapper">
              <input name="password" placeholder="Password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} />
              <span className="toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <p className="auth-error">{errors.password}</p>

            <p className="forgot-text" onClick={() => setView("forgot")}>Forgot Password?</p>
          </>
        )}

        {/* FORGOT */}
        {view === "forgot" && (
          <>
            <input name="emailOrPhone" placeholder="Enter your registered email or phone" value={formData.emailOrPhone} onChange={handleChange} />
            <p className="auth-error">{errors.emailOrPhone}</p>
          </>
        )}

        <button className="auth-btn" type="submit" disabled={loading}>
          {loading ? "Loading..." : view === "login" ? "Login" : view === "signup" ? "Sign Up" : "Send Reset Link"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="auth-footer">
          {view === "login" && <>Don't have an account? <span onClick={() => setView("signup")}>Sign Up</span></>}
          {view === "signup" && <>Already have an account? <span onClick={() => setView("login")}>Login</span></>}
          {view === "forgot" && <span onClick={() => setView("login")}>Back to Login</span>}
        </div>
      </form>
    </div>
  );
};

export default UserAuth;
