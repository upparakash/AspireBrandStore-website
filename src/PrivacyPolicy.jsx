import React from "react";
import {useNavigate} from "react-router-dom";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
    const navigate=useNavigate()
     const Privacy=()=> {
    navigate("/PrivacyPolicy")
 }
  return (

    <div className="privacy-page">
      <div className="privacy-container">
        <h1 className="privacy-title" onClick={PrivacyPolicy}>Privacy Policy</h1>
        <p className="privacy-updated">Last Updated: 12/05/2025</p>

        {/* Overview */}
        <section className="privacy-section">
          <p className="privacy-intro">
            Welcome to <strong>Aspire Brand Store</strong> – your go-to destination
            for stylish, quality fashion. Your privacy is important to us, and
            we’re committed to being clear and transparent about how we collect,
            use, and protect your personal data.
          </p>
        </section>

        {/* Privacy Priority */}
        <section className="privacy-section">
          <h2>🔐 Your Privacy, Our Priority</h2>
          <p>
            At Aspire Store, we only collect the information we truly need to
            deliver a seamless, secure, and personalized shopping experience.
            We never sell your data. Ever.
          </p>
        </section>

        {/* What We Collect */}
        <section className="privacy-section">
          <h2>📦 What We Collect</h2>
          <ul>
            <li><strong>Contact Info:</strong> Name, email, phone number, shipping/billing address</li>
            <li><strong>Order Info:</strong> Purchased items, payment method (securely processed), order history</li>
            <li><strong>Account Details:</strong> Login credentials (securely encrypted)</li>
            <li><strong>Device Data:</strong> IP address, browser type, location, site interactions</li>
            <li><strong>Marketing Preferences:</strong> Newsletter and promotional preferences</li>
          </ul>
        </section>

        {/* Why We Collect */}
        <section className="privacy-section">
          <h2>💡 Why We Collect It</h2>
          <ul>
            <li>Process orders and provide customer support</li>
            <li>Send order updates and shipping notifications</li>
            <li>Personalize your shopping experience</li>
            <li>Improve our website and product offerings</li>
            <li>Send offers and promotions (only if you opt in)</li>
          </ul>
        </section>

        {/* Sharing Info */}
        <section className="privacy-section">
          <h2>🤝 Who We Share It With</h2>
          <ul>
            <li><strong>Payment Gateways:</strong> Razorpay, Stripe</li>
            <li><strong>Delivery Partners:</strong> Courier and logistics services</li>
            <li><strong>Marketing Tools:</strong> Email and notification platforms</li>
            <li><strong>Analytics Tools:</strong> Google Analytics</li>
          </ul>
          <p>All partners are required to follow strict data protection standards.</p>
        </section>

        {/* Cookies */}
        <section className="privacy-section">
          <h2>🍪 Cookies & Tracking</h2>
          <ul>
            <li>Keep you logged in</li>
            <li>Save your shopping cart</li>
            <li>Show relevant products</li>
            <li>Analyze website usage</li>
          </ul>
          <p>You can manage cookie settings through your browser at any time.</p>
        </section>

        {/* User Rights */}
        <section className="privacy-section">
          <h2>👤 Your Rights</h2>
          <ul>
            <li>Access or update your personal information</li>
            <li>Request a copy or deletion of your data</li>
            <li>Unsubscribe from marketing emails anytime</li>
          </ul>
          <p>
            Contact us at{" "}
            <a href="mailto:support@aspireths.com">support@aspireths.com</a>
          </p>
        </section>

        {/* Security */}
        <section className="privacy-section">
          <h2>🔒 How We Keep It Safe</h2>
          <p>
            We use SSL encryption, firewalls, secure servers, and restricted
            access controls to safeguard your information.
          </p>
        </section>

        {/* Children */}
        <section className="privacy-section">
          <h2>🚫 Children’s Privacy</h2>
          <p>
            Our website is not intended for children under 13. If we discover
            such data, it will be deleted immediately.
          </p>
        </section>

        {/* Updates */}
        <section className="privacy-section">
          <h2>🔄 Updates to This Policy</h2>
          <p>
            We may update this policy from time to time. Any changes will be
            reflected by updating the “Last Updated” date on this page.
          </p>
        </section>

        {/* Contact */}
        <section className="privacy-section privacy-contact">
          <h2>📩 Got Questions?</h2>
          <p>Email: <a href="mailto:support@aspireths.com">support@aspireths.com</a></p>
          <p>Website: <a href="https://www.aspirebrand.store" target="_blank" rel="noreferrer">www.aspirebrand.store</a></p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
