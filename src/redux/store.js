import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

// 🔹 Persist cart automatically
store.subscribe(() => {
  const { items, totalItems } = store.getState().cart;
  localStorage.setItem("cartItems", JSON.stringify(items));
  localStorage.setItem("totalItems", JSON.stringify(totalItems));
});
