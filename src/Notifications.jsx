import React from "react";
import "./Notifications.css";
import { NavLink } from "react-router-dom";
const Notifications = () => {
    const notifications = [

  {
    id: 1,
    type: "order",        /* Optional */ 
    title: "Order Status",
    message: "Your order #12345 has been shipped",
    time: "2 hrs ago",
    icon: "🚚",
    link: "Orders",
  },

  {
    id: 2,
    type: "offer",
    title: "New Offers",
    message: "Flat 30% OFF on Gold Chains",
    time: "5 hrs ago",
    icon: "🏷️",
    link: "offers1"
  },

  {
    id: 3,
    type: "wishlist",
    title: "Price Drop",
    message: "Price dropped for Necklace Collection",
    time: "1 day ago",
    icon: "💖",
    link: "TrackOrder",
  }
];


  return ( 

    <div className="notification-container">
      <h2 className="messages">Notifications ✨</h2>

      <div className="notification-list">
        {notifications.map((item) => (
          <div key={item.id} className="notification-card">
            <div className="notification-icon">{item.icon}</div>

            <div className="notification-content">
              <NavLink to={`/${item.link}`}>{item.title}</NavLink>
              <p>{item.message}</p>
              <span className="time">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


};

export default Notifications;
