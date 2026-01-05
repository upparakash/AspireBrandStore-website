// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Login API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ emailOrPhone, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/api/customers/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrPhone, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch user profile if token exists
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token || localStorage.getItem("token");
    if (!token) return rejectWithValue("No token found");
    try {
      const res = await fetch(`${BASE_URL}/api/customers/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH PROFILE
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
