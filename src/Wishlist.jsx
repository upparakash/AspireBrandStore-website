import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHeartBroken } from "react-icons/fa";
import { removeFromWishlist } from "./redux/wishlistSlice";
import "./Wishlist.css";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const viewProduct = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate(`/product/${product.id}`);
  };

  // 🟡 Empty State
  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <FaHeartBroken size={60} />
        <h2>Your Wishlist is Empty</h2>
        <p>Start liking products to see them here ❤️</p>
        <button onClick={() => navigate("/Home")}>
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h2 className="wishlist-title">
        My Wishlist ({wishlistItems.length})
      </h2>

      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div className="wishlist-card" key={item.id}>
            <img
              src={item.image}
              alt={item.name}
              onClick={() => viewProduct(item)}
            />

            <div className="wishlist-info">
              <h3 onClick={() => viewProduct(item)}>{item.name}</h3>
              <p className="brand">{item.brand}</p>
              <p className="price">₹{item.price}</p>
            </div>

            <button
              className="remove-btn"
              onClick={() => handleRemove(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
