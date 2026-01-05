import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payments.css";
import { useSelector } from "react-redux";

export default function Payments() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = location.state?.items || [];
  const total = location.state?.total || 0;
   const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [pinLoading, setPinLoading] = useState(false);
  const [pinError, setPinError] = useState("");

  const [step, setStep] = useState("summary");
 
  //  Address state
  const [address, setAddress] = useState({
    fullname: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
    city: "",
  });
const user = useSelector((state) => state.auth.user);

useEffect(() => {
  // 🔴 If user is NOT logged in → show popup
  if (!user) {
    setShowLoginPopup(true);
    return;
  }

  // ✅ Logged-in user flow
  let saved = localStorage.getItem("userAddress");
  saved = saved ? JSON.parse(saved) : null;

  setAddress((prev) => ({
    ...prev,
    fullname: user?.fullName || prev.fullname,
    email: user?.email || prev.email,
    mobile: user?.phone || prev.mobile,
    address: saved?.address || prev.address,
    city: saved?.city || prev.city,
    pincode: saved?.pincode || prev.pincode,
  }));
}, [user]);



  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };


  const fetchCityByPincode = async (pincode) => {
    if (!/^\d{6}$/.test(pincode)) {
      setPinError("Enter valid 6-digit pincode");
      setAddress((prev) => ({ ...prev, city: "" }));
      return;
    }
    try {
      setPinLoading(true);
      setPinError("");
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await res.json();
      if (data[0].Status !== "Success") {
        setPinError("Please enter correct pincode");
        setAddress((prev) => ({ ...prev, city: "" }));
        return;
      }
      const postOffice = data[0].PostOffice[0];
      setAddress((prev) => ({
        ...prev,
        city: postOffice.District,
      }));
    } catch {
      setPinError("Failed to fetch city");
      setAddress((prev) => ({ ...prev, city: "" }));
    } finally {
      setPinLoading(false);
    }
  };

  const [paymentMode, setPaymentMode] = useState("");

  if (items.length === 0) {
    return <h2>No items found for payment</h2>;
  }

  return (
    <div className="payment-page">
      <h2>Checkout</h2>

      {/* STEP 1: ADDRESS */}
      {step === "summary" && (
  <div className="section">
    <h3>Order Summary</h3>

    {/* 🔹 ADDRESS FORM INSIDE SUMMARY */}
    <div className="address-box">
      <h4>Shipping Address</h4>

      <input
        type="text"
        name="fullname"
        placeholder="Full Name"
        className="input-box"
        value={address.fullname}
        onChange={handleAddressChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="input-box"
        value={address.email}
        onChange={handleAddressChange}
      />

      <input
        type="tel"
        name="mobile"
        placeholder="Mobile Number"
        className="input-box"
        value={address.mobile}
        onChange={handleAddressChange}
        maxLength={10}
      />

      <textarea
        name="address"
        placeholder="Address"
        className="input-box"
        value={address.address}
        onChange={handleAddressChange}
      />

      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        className="input-box"
        value={address.pincode}
        maxLength={6}
        onChange={(e) => {
          const pin = e.target.value.replace(/\D/g, "");
          setAddress({ ...address, pincode: pin });
          if (pin.length === 6) fetchCityByPincode(pin);
          else setAddress((prev) => ({ ...prev, city: "" }));
        }}
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        className="input-box"
        value={address.city}
        readOnly
      />

      {pinLoading && <p className="info">Fetching city...</p>}
      {pinError && <p className="error">{pinError}</p>}
    </div>

    {showLoginPopup && (
  <div className="login-popup-overlay">
    <div className="login-popup">
      <h3>Login Required</h3>
      <p>Please login to continue with your order.</p>

      <div className="popup-actions">
        <button
          className="login-btn"
          onClick={() => navigate("/Login")}
        >
          Go to Login
        </button>

        <button
          className="cancel-btn"
          onClick={() => navigate("/Cartpage")}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


    {/* 🔹 ORDER ITEMS */}
    <div className="payment-items">
      {items.map((item, index) => (
        <div key={index} className="payment-card">
          <img src={item.img} alt={item.name} className="payment-img" />
          <div>
            <h3>{item.name}</h3>
            <p>Brand: {item.brand}</p>
            <p>Price: ₹{item.price}</p>
            <p>Quantity: {item.qty}</p>
          </div>
        </div>
      ))}
    </div>

    <h2 className="payment-total">Total: ₹{total}</h2>

    <div className="button1">
      <button className="back-btn" onClick={() => navigate("/Cartpage")}>
        ⬅ Back to Cart
      </button>

      <button
        className="next-btn"
        onClick={() => {
          if (
            !address.fullname ||
            !address.email ||
            !address.mobile ||
            !address.address ||
            !address.pincode ||
            !address.city
          ) {
            alert("Please fill your address before proceeding.");
            return;
          }
          setStep("payment");
        }}
      >
        Go to Payment
      </button>
    </div>
  </div>
)}


      {/* STEP 3: PAYMENT */}
      {step === "payment" && (
        <div className="section">
          <h3>Select Payment Mode</h3>

          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="card"
                onChange={(e) => setPaymentMode(e.target.value)}
              />
              Debit / Credit Card
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="netbanking"
                onChange={(e) => setPaymentMode(e.target.value)}
              />
              Net Banking
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="cod"
                onChange={(e) => setPaymentMode(e.target.value)}
              />
              Cash on Delivery
            </label>
          </div>

          {paymentMode === "card" && (
            <div className="card-form">
              <input type="text" placeholder="Card Number" className="input-box" />
              <input type="text" placeholder="Card Holder Name" className="input-box" />
              <input type="text" placeholder="Expiry MM/YY" className="input-box" />
              <input type="text" placeholder="CVV" className="input-box" />
              <button className="pay-btn">Pay ₹{total}</button>
            </div>
          )}

          {paymentMode === "netbanking" && (
            <div className="card-form">
              <select className="input-box">
                <option>Select Bank</option>
                <option>SBI</option>
                <option>HDFC</option>
                <option>ICICI</option>
                <option>Axis Bank</option>
                <option>Andhra Bank</option>
                <option>Canera Bank</option>
              </select>

              <button className="pay-btn">Pay ₹{total}</button>
            </div>
          )}

          {paymentMode === "cod" && (

            <div className="card-form">
              <p>You will pay when your order arrives.</p>

              <button className="pay-btn">Confirm Order</button>
            </div>

          )}

          <button className="back-btn1" onClick={() => setStep("summary")}>
            ⬅ Back
          </button>

        </div>
      )}
    </div>
  );
}