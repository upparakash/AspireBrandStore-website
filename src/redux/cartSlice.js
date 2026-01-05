// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalItems: JSON.parse(localStorage.getItem("totalItems")) || 0, // total quantity
};

// Helper function to calculate total items
const calculateTotalItems = (items) => items.reduce((sum, item) => sum + item.qty, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) existing.qty += action.payload.qty;
      else state.items.push(action.payload);

      state.totalItems = calculateTotalItems(state.items);

      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },

    incrementQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty += 1;

      state.totalItems = calculateTotalItems(state.items);

      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },

    decrementQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.qty > 1) item.qty -= 1;
        else state.items = state.items.filter((i) => i.id !== action.payload);
      }

      state.totalItems = calculateTotalItems(state.items);

      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);

      state.totalItems = calculateTotalItems(state.items);

      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },

    // Optional: Clear cart completely
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("totalItems", JSON.stringify(0));
    },
  },
});

export const { addItem, incrementQty, decrementQty, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
