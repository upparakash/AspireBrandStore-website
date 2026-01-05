import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Trackingpage.css";

const OrderTracking = () => {
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState("");

    const handleTrack = () => {
        
        if (!orderId.trim()) {
            navigate("/Invalid");
            return;
        }

        navigate("/Invalid");
    };


    return (
        <div className="track-container">
            <h2 className="track-title">Track Your Order</h2>
            <p className="track-description">
                To track your order please enter your Order ID in the box below and press the
                <strong> "Track"</strong> button. This was given to you on your receipt and in the
                confirmation email you should have received.
            </p>

            <div className="track-box">
                <label>Order ID</label>
                <input
                    type="text"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />
                <button onClick={handleTrack}>Track</button>
            </div>
        </div>
    );
};

export default OrderTracking;
