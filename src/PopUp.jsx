import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExciteImage from './images/ExcitementImage.webp';
import "./PopUp.css";

export default function PopUp() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  const goToOffers = () => {
    setShowPopup(false);
    navigate("/offers1"); // 👉 your route for offer page
  };

  return (
    <>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">

            {/* Advertisement Image */}
            <img
              src={ExciteImage}
              alt="Advertisement"
              className="popup-ad-img"
            />

            {/* Scrolling Offer Bar */}
            <div className="scroll-offer-bar" onClick={goToOffers}>
              <div className="scroll-text">
                🔥 Mega Sale! 70% OFF — Limited Time Offer — Click to Explore Deals! 🔥
              </div>
            </div>

            <button className="close-btn" onClick={closePopup}>✖</button>
          </div>
        </div>
      )}
    </>
  );
}
