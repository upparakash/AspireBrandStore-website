
import React, { useState } from "react";
import "./Cartpage.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { incrementQty, decrementQty, removeItem } from "./redux/cartSlice.js";



export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ State for selected items
  const [selectedIds, setSelectedIds] = useState([]);

  // ✅ Total price calculation only for selected items
  const totalPrice = cartItems
    .filter((item) => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckboxChange = (item) => {
    if (selectedIds.includes(item.id)) {
      setSelectedIds(selectedIds.filter((id) => id !== item.id));
    } else {
      setSelectedIds([...selectedIds, item.id]);
    }
  };

  const handleCheckout = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one product to checkout!");
      return;
    }
 
    const itemsToCheckout = cartItems.filter((item) =>
      selectedIds.includes(item.id)
    );

    navigate("/payments", {
      state: { items: itemsToCheckout, total: totalPrice },
    });
  };

  const handlePayment = (item) => {
    navigate("/payments", {
      state: { items: [item], total: item.price * item.qty },
    });
  };

  return (
    <div className="cart-page">
      <div className="cart">
        <h2>Your Shopping Cart 🛒</h2>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty!</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id} style={{ position: "relative" }}>
                {/* ✅ Checkbox on top-right */}
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleCheckboxChange(item)}
                />

                <img src={item.img} alt={item.name} className="cart-img" />

                <div className="item-details" style={{ textAlign: "center" }}>
                  <h4>{item.name}</h4>
                  <p className="brand">{item.brand}</p>
                  <p>Price: ₹{item.price}</p>

                  <div className="quantity">
                    <button onClick={() => dispatch(decrementQty(item.id))}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => dispatch(incrementQty(item.id))}>+</button>
                  </div>

                  <p>Subtotal: ₹{(item.price * item.qty).toFixed(2)}</p>

                  <div className="btn-group">
                    <button
                      className="remove-btn"
                      onClick={() => {
                        dispatch(removeItem(item.id));
                        setSelectedIds(selectedIds.filter((id) => id !== item.id));
                      }}
                    >
                      Remove
                    </button>

                    <button
                      className="payment-btn"
                      onClick={() => handlePayment(item)}
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}