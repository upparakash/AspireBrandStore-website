import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaStar, FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "./redux/cartSlice.js";
import "./ProductCard.css";

function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //  Toggle Like
  const toggleLike = () => {
    setLiked(!liked);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  //  Share Product
  const handleShare = () => {
    const url = `${window.location.origin}/product/${product.id}`;
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: "Check out this product!",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Product link copied!");
    }
  };

  //  Dummy rating
  const renderStars = (rating = 4) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < rating ? "star filled" : "star"} />
    ));
  };

  //  Add to Cart
  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        brand: product.brand,
        img: product.image,
        price: product.price,
        qty: 1,
      })
    );

    alert(`${product.name} added to cart `);
  };

  // 👀 View Product
  const viewProduct = () => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card">
      <div className="image-container" onClick={viewProduct}>
        <img src={product.image} alt={product.name} />

        {/* ❤️ Like */}
        <div
          className={`heart-icon1 ${liked ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleLike();
          }}
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
        </div>

        {/* Share */}
        <div
          className="share-btn1"
          onClick={(e) => {
            e.stopPropagation();
            handleShare();
          }}
        >
          <FaShareAlt />
        </div>

        {showPopup && (
          <div className="popup-message">
            {liked ? "Liked ❤️" : "Unliked 💔"}
          </div>
        )}
      </div>

      <h3 onClick={viewProduct}>{product.name}</h3>
      <p className="brand">{product.brand}</p>

      {/*  Rating */}
      <div className="rating-section">{renderStars()}</div>

      {/*  Price */}
      <p className="price">
        <span className="discount">₹{product.price}</span>
      </p>
      
      <div className="uniquer-sell">
      <button onClick={handleAddToCart} className="cart-part">
        Add to Cart
      </button> 
      <button className="buyer-now">
        Buy Now
      </button>
      </div>

    </div>
  );
}

export default ProductCard;