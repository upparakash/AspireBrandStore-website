import React from "react";
import { useNavigate } from "react-router-dom";
import "./Orderstatus.css";

const OrderStatus = () => {

    const Navigate = useNavigate()
    const Orders = () => {

    }

    const steps = [
        { label: "Order Placed", date: "20 Nov", status: "placed" },
        { label: "Order Confirmed", date: "21 Nov", status: "confirmed" },
        { label: "Packed", date: "22 Nov", status: "packed" },
        { label: "Shipped", date: "23 Nov", status: "shipped" },
        { label: "Delivered", date: "Pending", status: "pending" }
    ];

    return (
        <div className="order-status-box" onClick={Orders}>
            <h2 className="status-title">Order Status</h2>

            <div className="status-timeline">
                {steps.map((step, index) => (
                    <div key={index} className={`status-step ${step.status}`}>
                        <div className="step-left">
                            <div className="step-dot"></div>
                            {index !== steps.length - 1 && <div className="step-line"></div>}
                        </div>

                        <div className="step-content">
                            <h4>{step.label}</h4>
                            <p>{step.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderStatus;