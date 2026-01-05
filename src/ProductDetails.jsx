// ProductDetails.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addItem } from "./redux/cartSlice";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  const [rating, setRating] = useState(0);
  const [mainImage, setMainImage] = useState("");
  const [imgIndex, setImgIndex] = useState(0);

  // Zoom
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Drag
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  /* ================= HOVER PREVIEW ZOOM ================= */
  const [showPreview, setShowPreview] = useState(false);
  const [imgRect, setImgRect] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const ZOOM_FACTOR = 2.5;

  useEffect(() => {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct") || "null");

    if (selectedProduct && String(selectedProduct.id) === String(id)) {
      setProduct(selectedProduct);
      setRating(selectedProduct.rating || 4);

      const imgs = selectedProduct.images?.length
        ? selectedProduct.images
        : [selectedProduct.img];

      setMainImage(imgs[0]);
      setImgIndex(0);
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const images = product.images?.length ? product.images : [product.img];

  // CART
  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        img: mainImage,
        qty: 1,
      })
    );
    alert(`${product.name} added to cart!`);
  };

  // SHARE
  const handleShare = async () => {
    const url = `${window.location.origin}/product/${product.id}`;
    if (navigator.share) {
      await navigator.share({ title: product.name, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link Copied!");
    }
  };

  // PREV IMAGE
  const showPrevImage = () => {
    const newIndex = imgIndex === 0 ? images.length - 1 : imgIndex - 1;
    setImgIndex(newIndex);
    setMainImage(images[newIndex]);
    resetZoom();
  };

  // NEXT IMAGE
  const showNextImage = () => {
    const newIndex = (imgIndex + 1) % images.length;
    setImgIndex(newIndex);
    setMainImage(images[newIndex]);
    resetZoom();
  };

  // RESET ZOOM
  const resetZoom = () => {
    setZoomLevel(1);
    setTranslate({ x: 0, y: 0 });
  };

  // DRAG START
  const startDrag = (e) => {
    if (zoomLevel <= 1) return;
    e.preventDefault();

    setIsDragging(true);

    setStartPos({
      x: e.clientX - translate.x,
      y: e.clientY - translate.y,
    });
  };

  const convertOembedToIframe = (html) => {
    if (!html) return "";

    return html.replace(
      /<oembed url="([^"]+)"><\/oembed>/g,
      (match, url) => {
        let videoId = "";

        // YouTube short link
        if (url.includes("youtu.be")) {
          videoId = url.split("youtu.be/")[1]?.split("?")[0];
        }

        // YouTube full link
        if (url.includes("youtube.com")) {
          const params = new URL(url).searchParams;
          videoId = params.get("v");
        }

        if (!videoId) return "";

        return `
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      `;
      }
    );
  };


  // DRAG MOVE (bounded – no background visible)
  const duringDrag = (e) => {
    if (!isDragging || zoomLevel <= 1) return;

    const overlay = e.currentTarget.parentElement.getBoundingClientRect();
    const imgWidth = overlay.width * zoomLevel;
    const imgHeight = overlay.height * zoomLevel;

    let x = e.clientX - startPos.x;
    let y = e.clientY - startPos.y;

    const maxX = (imgWidth - overlay.width) / 2;
    const maxY = (imgHeight - overlay.height) / 2;

    if (imgWidth <= overlay.width) x = 0;
    else if (x > maxX) x = maxX;
    else if (x < -maxX) x = -maxX;

    if (imgHeight <= overlay.height) y = 0;
    else if (y > maxY) y = maxY;
    else if (y < -maxY) y = -maxY;

    setTranslate({ x, y });
  };

  const stopDrag = () => setIsDragging(false);

  const LENS_SIZE = 150; // smaller lens (try 100–140)

  return (
    <div className="pd-page">
      <div className="pd-container">
        <button className="pd-back" onClick={() => navigate(-1)}>← Back</button>

        <div className="pd-grid">

          
{/* LEFT MEDIA */}
          <div className="pd-media">
            <div
              className="pd-image-wrapper"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setImgRect(rect);
                setShowPreview(true);
              }}
              onMouseLeave={() => {
                setShowPreview(false);
                setImgRect(null);
              }}
              onMouseMove={(e) => {
                if (!imgRect) return;

                const half = LENS_SIZE / 2;

                let x = e.clientX - imgRect.left;
                let y = e.clientY - imgRect.top;

                // 🔒 Clamp so lens follows cursor exactly & stays inside image
                x = Math.max(half, Math.min(x, imgRect.width - half));
                y = Math.max(half, Math.min(y, imgRect.height - half));

                setCursorPos({ x, y });
              }}
            >
              <button className="pd-main-prev" onClick={showPrevImage}>❮</button>

              <img
                src={mainImage}
                alt={product.name}
                className="pd-image"
                draggable={false}
                onClick={() => {
                  setZoomOpen(true);
                  resetZoom();
                }}
              />

              <button className="pd-main-next" onClick={showNextImage}>❯</button>

              {showPreview && imgRect && (
                <div
                  className="pd-zoom-lens"
                  style={{
                    width: LENS_SIZE,
                    height: LENS_SIZE,
                    left: cursorPos.x - LENS_SIZE / 2,
                    top: cursorPos.y - LENS_SIZE / 2,
                  }}
                />
              )}
            </div>


            {/* THUMBNAILS */}
            <div className="pd-thumbnails">
              {images.map((imgSrc, i) => (
                <img
                  key={i}
                  src={imgSrc}
                  alt="thumb"
                  className={`pd-thumb ${mainImage === imgSrc ? "active" : ""}`}
                  onClick={() => {
                    setMainImage(imgSrc);
                    setImgIndex(i);
                    resetZoom();
                  }}
                />
              ))}
            </div>
          </div>
          



          {/* RIGHT SIDE INFO */}
          <div className="pd-info">
            <h1 className="pd-title">{product.name}</h1>
            <p className="pd-brand">{product.brand}</p>

            <div className="pd-price-row">
              <div className="pd-price">
                <span className="pd-actual">₹{product.price}</span>
                {product.actualPrice && (
                  <span className="pd-discount">₹{product.actualPrice}</span>
                )}
              </div>

              <div className="pd-actions">
                <button
                  className={`pd-like ${liked ? "liked" : ""}`}
                  onClick={() => setLiked(!liked)}
                >
                  {liked ? <FaHeart /> : <FaRegHeart />}
                </button>
                <button className="pd-share" onClick={handleShare}>
                  <FiShare2 />
                </button>
              </div>
            </div>

            <div className="pd-rating">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar
                  key={i}
                  className={`pd-star ${i <= rating ? "filled" : ""}`}
                  onClick={() => setRating(i)}
                />
              ))}
              <span className="pd-reviews">({product.reviews ?? 0} reviews)</span>
            </div>

            <div className="pd-desc">
              <h3>Description</h3>

              {product.description ? (
                <div
                  className="pd-desc-content"
                  dangerouslySetInnerHTML={{
                    __html: convertOembedToIframe(product.description),
                  }}
                />
              ) : (
                <p>No description available.</p>
              )}
            </div>


            <div className="pd-footer">
              <button className="pd-addcart" onClick={handleAddToCart}>
                <FaShoppingCart /> Add to Cart
              </button>

              <button
                className="pd-buy"
                onClick={() =>
                  navigate("/Payments", {
                    state: {
                      items: [
                        {
                          id: product.id,
                          name: product.name,
                          brand: product.brand,
                          img: mainImage,
                          price: product.price,
                          qty: 1,
                        },
                      ],
                      total: product.price,
                    },
                  })
                }
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* HOVER ZOOM PREVIEW (FIXED, NO FLICKER) */}
{showPreview && imgRect && (
  <div
    className="pd-zoom-preview"
    style={{
      top: imgRect.top,
      left: imgRect.right + 30,
      width: imgRect.width *1.4,
      height: imgRect.height *1.1,
    }}
  >
    <div
      className="pd-zoom-preview-img"
      style={{
        backgroundImage: `url(${mainImage})`,
        backgroundSize: `${imgRect.width * ZOOM_FACTOR}px ${imgRect.height * ZOOM_FACTOR}px`,
        backgroundPosition: `${-cursorPos.x * (ZOOM_FACTOR - 1)}px ${-cursorPos.y * (ZOOM_FACTOR - 1)}px`,
      }}
    />
  </div>
)}

      </div>

      {/* FULLSCREEN ZOOM */}
      {zoomOpen && (
        <div
          className="zoom-overlay"
          onClick={() => setZoomOpen(false)}
          onWheel={(e) => {
            e.preventDefault();
            const step = 0.15;
            const newZoom = zoomLevel + (e.deltaY < 0 ? step : -step);
            setZoomLevel(Math.min(Math.max(newZoom, 1), 4));
            setTranslate({ x: 0, y: 0 });
          }}
        >
          {/* LEFT / RIGHT buttons */}
          <button className="zoom-prev" onClick={(e) => { e.stopPropagation(); showPrevImage(); }}>❮</button>
          <button className="zoom-next" onClick={(e) => { e.stopPropagation(); showNextImage(); }}>❯</button>

          {/* ZOOM BUTTONS */}
          <div className="zoom-controls" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setZoomLevel((z) => Math.min(z + 0.3, 4))}>+</button>
            <button onClick={() => setZoomLevel((z) => Math.max(z - 0.3, 1))}>-</button>
            <button className="zoom-reset-btn" onClick={resetZoom}>Clear</button>
          </div>
          {/* ❌ CLOSE BUTTON */}
          <button
            className="zoom-close"
            onClick={() => setZoomOpen(false)}
          >
            ✕
          </button>

          {/* DRAGGABLE IMAGE */}
          <img
            src={mainImage}
            alt="zoomed"
            className="zoom-image-view"
            style={{
              transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoomLevel})`,
              cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default",
            }}
            onMouseDown={startDrag}
            onMouseMove={duringDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}