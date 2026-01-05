import React from "react";
import "./HomeItems.css";
import Payments from "./images/payments accepted.PNG"; // ✅ ADD THIS

export default function PaymentsLogos() {
  return (
    <div className="payments-container">
      <img
        src={Payments}
        alt="Payments Accepted"
        className="payments-img"
      />
    </div>
  );
}
