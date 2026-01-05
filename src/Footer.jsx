import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "./images/Brandstorelogo.webp";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">

          <div className="footer-top">
            {/* Brand */}
            <div className="footer-brand">
              <img src={logo} alt="Aspire jewellery logo" />
              <p>
                Discover your inner sparkle with Aspire — where every jewel tells your story.
                <br />
                Aspire — Your shine, our story.
              </p>
            </div>

            {/* Links */}
            <div className="footer-links">
              <div>
                <h3>Shop</h3>
                <ul>
                  <li><Link to="/Home">All Products</Link></li>
                  <li><Link to="/wishlist">Wishlist</Link></li>
                </ul>
              </div>

              <div className="support-links">
                <h3>Support</h3>
                <ul>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/ContactUs">Contact</Link></li>
                  <li><Link to="/faqs">FAQs</Link></li>
                </ul>
              </div>

              <div>
                <h3>Policies</h3>
                <ul>
                  <li><Link to="/PrivacyPolicy">Privacy Policy</Link></li>
                  <li><Link to="/terms-conditions">Terms and Service</Link></li>
                  <li><Link to="/returns">Returns & Refunds</Link></li>
                </ul>
              </div>
            </div>

            {/* Social */}
            <div className="footer-social">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="https://www.facebook.com/people/Aspire-TekHub-Solutions/61565362786512/" target="_blank" rel="noreferrer">
                  <FaFacebookF />
                </a>
                <a href="https://www.instagram.com/aspireths/?hl=en" target="_blank" rel="noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/company/aspire-tekhub-solutions/?originalSubdomain=in" target="_blank" rel="noreferrer">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom red line (inside footer) */}
          <div className="footer-border"></div>
        </div>
      </footer>

      {/* COPYRIGHT (OUTSIDE FOOTER) */}
      <div className="footer-copyright">
        © {new Date().getFullYear()} <span>Aspire Brand Store</span>. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
