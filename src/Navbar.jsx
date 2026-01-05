import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoSearchOutline,
  IoNotifications,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import logo from "./images/Brandstorelogo.webp";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/authSlice";
import Component from "./Component";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const totalItems = useSelector((state) => state.cart.totalItems);

const wishlistCount = useSelector(
  (state) => state.wishlist.items.length
);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close menu on click
  const handleMenuItemClick = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };
  

  return (
    <nav className={`navbar ${menuOpen ? "open" : ""}`}>
      <Component />
      <div className="nav-container">

        {/* Logo */}
        <NavLink className="logo" to="/Home" onClick={handleMenuItemClick}>
          <img src={logo} alt="logo" />
        </NavLink>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>

        {/* Nav Links */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <NavLink to="/Home" onClick={handleMenuItemClick}>Home</NavLink>
          <NavLink to="/products/Necklaces" onClick={handleMenuItemClick}>Necklaces</NavLink>
          <NavLink to="/products/Rings" onClick={handleMenuItemClick}>Rings</NavLink>
          <NavLink to="/products/Earrings" onClick={handleMenuItemClick}>Earrings</NavLink>
          <NavLink to="/products/Bracelets" onClick={handleMenuItemClick}>Bracelets</NavLink>
          <NavLink to="/About" onClick={handleMenuItemClick}>AboutUs</NavLink>
          <NavLink to="/ContactUs" onClick={handleMenuItemClick}>ContactUs</NavLink>
          <NavLink to="/TrackOrder" onClick={handleMenuItemClick}>TrackOrder</NavLink>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <IoSearchOutline className="search-icon" />
        </div>

        {/* Right Icons */}
        <div className="icon-group">

          {/* ✅ Profile Logic */}
          {user ? (
            <div className="profile-wrapper">
              <img
                src={user.profile}
                alt="profile"
                className="profile-img"
                onClick={() => setProfileOpen(!profileOpen)}
                onError={(e) => (e.target.src = "/default-user.png")}
              />

              {profileOpen && (
                <div className="profile-dropdown">
                  <p className="profile-name">{user.fullName}</p>

                  <NavLink to="/Profile" onClick={handleMenuItemClick}>
                    My Profile
                  </NavLink>

                  <button
                    onClick={() => {
                      dispatch(logout());
                      navigate("/Login");
                      setProfileOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/Login" className="icon" onClick={handleMenuItemClick}>
              <FaUser />
            </NavLink>
          )}

          {/* Cart */}
          <NavLink to="/Cartpage" className="icon cart-icon" onClick={handleMenuItemClick}>
            <FaShoppingCart />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </NavLink>

          {/* Notifications */}
          <NavLink to="/Notifications" className="icon" onClick={handleMenuItemClick}>
            <IoNotifications />
          </NavLink>


          {/* Wishlist */}
          <NavLink to="/Wishlist" className="icon wishlist-icon" onClick={handleMenuItemClick}>
            <FaHeart />
            {wishlistCount > 0 && (
              <span className="wishlist-count">{wishlistCount}</span>
            )}
          </NavLink>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
