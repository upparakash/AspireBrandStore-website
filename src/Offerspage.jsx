import React from "react";
import ProductNecklace from './images/ProductNecklace.webp';
import ProductBracelet from './images/ProductBracelet.avif';
import ProductRing from './images/ProductRing.avif';
import "./Offerspage.css";

export default function OffersPage() {
    const offerProducts = [
        { id: 1, name: "Gold Necklace", price: "₹15000", offer: "₹9999", img: ProductNecklace },
        { id: 2, name: "Gold Bracelet", price: "₹20000", offer: "₹14999", img: ProductBracelet },
        { id: 3, name: "Diamond Ring", price: "₹8000", offer: "₹4999", img: ProductRing },
        { id: 4, name: "Gold Necklace", price: "₹15000", offer: "₹9999", img: ProductNecklace },
        { id: 5, name: "Gold Bracelet", price: "₹20000", offer: "₹14999", img: ProductBracelet },
        { id: 6, name: "Diamond Ring", price: "₹8000", offer: "₹4999", img: ProductRing },

    ];

    return (
        <div className="offers-container">
            <h2>🔥 Special Offers for You 🔥</h2>

            <div className="offers-grid">
                {offerProducts.map((item) => (
                    <div className="offer-card" key={item.id}>
                        <img src={item.img} alt={item.name} />
                        <h4>{item.name}</h4>
                        <p className="old-price">{item.price}</p>
                        <p className="new-price">{item.offer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
