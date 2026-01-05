import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsappButton.css";

const WhatsappButton = () => {
    return (
        <a
            href="https://wa.me/918096100571?text=Hi!%20I%20want%20to%20know%20more%20about%20your%20products."
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
        >
            <FaWhatsapp className="whatsapp-icon" />
        </a>
    );
};

export default WhatsappButton;
