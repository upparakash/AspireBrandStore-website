import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItem } from "./redux/cartSlice";
import VideoReels from "./VideoReels";
import "./HomeItems.css";

const BASE = import.meta.env.VITE_BASE_URL;

const Addcart = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const popupTimerRef = useRef(null);

  /* =========================
     🔹 FETCH PRODUCTS (INITIAL LOAD)
  ========================== */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE}/api/subcategories`);

        const formatted = res.data.map((item) => ({
          id: item.id,
          name: item.subCategaryname,
          price: item.price,
          actualPrice: item.price + 300, // UI MRP
          image: item.image_1,
          images: [
            item.image_1,
            item.image_2,
            item.image_3,
            item.image_4,
          ].filter(Boolean),
          category: item.productCategory,
          brand: item.brand,
          sku: item.sku,
          material: item.material,
          gender: item.gender,
          description: item.description,
        }));

        setProducts(formatted);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchProducts();
  }, []);

  /* =========================
     🔥 SOCKET.IO (REAL-TIME)
  ========================== */
  useEffect(() => {
    const socket = io(BASE, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    console.log("Web socket connecting...");

    socket.on("connect", () => {
      console.log("Web socket connected:", socket.id);
    });

    /* 🔄 PRODUCT UPDATED */
    socket.on("subCategoryUpdated", (payload) => {
      console.log("Realtime update (WEB):", payload);

      setProducts((prev) =>
        prev.map((item) =>
          item.id === payload.id
            ? {
                ...item,
                name: payload.subCategaryname || item.name,
                price: payload.price ?? item.price,
                actualPrice:
                  (payload.price ?? item.price) + 300,
                image: payload.image_1 || item.image,
                images: [
                  payload.image_1,
                  payload.image_2,
                  payload.image_3,
                  payload.image_4,
                ].filter(Boolean),
                description: payload.description || item.description,
              }
            : item
        )
      );

      setPopupMessage(
        `${payload.subCategaryname} price updated to ₹${payload.price}`
      );
      setShowPopup(true);

      clearTimeout(popupTimerRef.current);
      popupTimerRef.current = setTimeout(
        () => setShowPopup(false),
        2000
      );
    });

    /* 🆕 PRODUCT CREATED */
    socket.on("productCreated", (payload) => {
      console.log("New product (WEB):", payload);

      const newProduct = {
        id: payload.id,
        name: payload.subCategaryname,
        price: payload.price,
        actualPrice: payload.price + 300,
        image: payload.image_1,
        images: [
          payload.image_1,
          payload.image_2,
          payload.image_3,
          payload.image_4,
        ].filter(Boolean),
        category: payload.productCategory,
        brand: payload.brand,
        sku: payload.sku,
        material: payload.material,
        gender: payload.gender,
        description: payload.description,
      };

      setProducts((prev) => [newProduct, ...prev]);
    });

    socket.on("disconnect", () => {
      console.log("Web socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  /* =========================
     ❤️ LIKE TOGGLE
  ========================== */
  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

    setPopupMessage(likedItems.includes(id) ? "UnLiked 💔" : "Liked ❤️");
    setShowPopup(true);

    clearTimeout(popupTimerRef.current);
    popupTimerRef.current = setTimeout(() => setShowPopup(false), 900);
  };

  /* =========================
     🔗 SHARE
  ========================== */
  const shareProduct = (item) => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: "Check this product!",
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported");
    }
  };

 /* =========================
     🛒 ADD TO CART
  ========================== */
 const handleAddToCart = (item) => {
    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        brand: item.brand,
        img: item.image,
        price:item.price,
        qty: 1,
      })
    );

    alert(`${item.name} added to cart` );
  };

  return (
    <>
      <ul className="product-list">
        {products.map((item) => (
          <li key={item.id} className="product-item">
            {/* ❤️ Like */}
            <div className="heart" onClick={() => toggleLike(item.id)}>
              {likedItems.includes(item.id) ? (
                <FaHeart className="heart filled" />
              ) : (
                <FaRegHeart className="heart outlined" />
              )}
            </div>

            {/* 🔗 Share */}
            <div className="share-btn" onClick={() => shareProduct(item)}>
              <FaShareAlt className="share-icon" />
            </div>

            {/* IMAGE */}
            <Link
              to={`/product/${item.id}`}
              className="img-link"
              onClick={() =>
                localStorage.setItem("selectedProduct", JSON.stringify(item))
              }
            >
              <div className="product-image-wrapper">
                <img src={item.image} alt={item.name} className="main-img" />
                <img
                  src={item.images[1] || item.image}
                  alt="hover"
                  className="hover-img"
                />
              </div>
            </Link>

            {/* INFO */}
            <div className="info-section">
              <h4 className="product-name">{item.name}</h4>


              <div className="price-section">
                <span className="actual-price">₹ {item.actualPrice}</span>
                <span className="discount-price">₹ {item.price}</span>
              </div>
              
              {/* ACTION BUTTONS */}
              <div className="action-buttons">
                {/* ADD TO CART */}
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>

                {/* BUY NOW */}
                <button
                  className="buy-now-btn"
                  onClick={() => {
                    localStorage.setItem(
                      "selectedProduct",
                      JSON.stringify(item)
                    );

                    Navigate("/Payments", {
                      state: {
                        items: [
                          {
                            id: item.id,
                            name: item.name,
                            img: item.image,
                            price: item.price,
                            qty: 1,
                          },
                        ],
                        total: item.price,
                      },
                    });
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <VideoReels />
      
      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Addcart;
