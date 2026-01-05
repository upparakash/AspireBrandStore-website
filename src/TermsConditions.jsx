import React from "react";
import {useNavigate} from "react-router-dom";
import "./TermsConditions.css";

const TermsConditions = () => {

  return (
    <div className="terms-page">
      <div className="terms-container">
        {/* Header */}
        <h1 className="terms-title" > Terms & Conditions</h1>
        <p className="terms-updated">Effective Date: 01-Jan-2026</p>

        {/* Intro */}
        <div className="terms-intro">
          <p>
            Welcome to <strong>Aspire Brand Store</strong>! By accessing or using
            our website{" "}
            <a href="https://www.aspirebrand.store" target="_blank" rel="noreferrer">
             www.aspirebrand.store
            </a>{" "}
            or making a purchase, you agree to comply with the following Terms
            and Conditions. Please read them carefully.
          </p>
        </div>

        {/* Sections */}
        <section className="terms-section">
          <h2>1. General Overview</h2>
          <p>
            These Terms & Conditions govern your access to and use of Aspire
            Store’s website and services. By using our platform, you agree to
            follow all applicable laws and these terms.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Account Registration</h2>
          <ul>
            <li>You may need to create an account to access certain features.</li>
            <li>Keep your login credentials secure and confidential.</li>
            <li>You are responsible for all activity under your account.</li>
            <li>
              We reserve the right to suspend or terminate accounts that violate
              our terms.
            </li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>3. Product Information & Pricing</h2>
          <ul>
            <li>We strive to display accurate product descriptions and images.</li>
            <li>
              Prices are listed in applicable currency and may change without
              prior notice.
            </li>
            <li>
              We reserve the right to modify or discontinue products at any
              time.
            </li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>4. Orders & Payments</h2>
          <ul>
            <li>All orders are subject to availability and confirmation.</li>
            <li>
              Payments are processed via secure third-party gateways. We do not
              store card details.
            </li>
            <li>
              Aspire Store may cancel orders due to payment issues, stock
              unavailability, or suspected fraud.
            </li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>5. Shipping & Delivery</h2>
          <ul>
            <li>Delivery timelines vary by location and shipping method.</li>
            <li>
              Delays caused by couriers, weather, or external factors are beyond
              our control.
            </li>
            <li>Shipping fees, if applicable, are shown at checkout.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>7. Promotions & Discounts</h2>
          <ul>
            <li>Offers may change or expire without prior notice.</li>
            <li>Discounts cannot be combined unless explicitly stated.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>8. User Conduct</h2>
          <ul>
            <li>Do not use the site for illegal or unauthorized purposes.</li>
            <li>Do not interfere with site security or functionality.</li>
            <li>Do not upload harmful, abusive, or misleading content.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>9. Intellectual Property</h2>
          <p>
            All content on Aspire Store—including logos, images, designs, and
            product descriptions—is the property of Aspire Store and protected
            by copyright laws. Unauthorized use is prohibited.
          </p>
        </section>

        <section className="terms-section">
          <h2>10. Limitation of Liability</h2>
          <ul>
            <li>Indirect or incidental damages from site usage.</li>
            <li>Losses due to delayed shipments or product availability.</li>
            <li>Minor inaccuracies in product images or descriptions.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>11. Governing Law</h2>
          <p>
            These terms are governed by applicable laws. Any disputes will be
            handled in the appropriate jurisdiction courts.
          </p>
        </section>

        <section className="terms-section">
          <h2>12. Changes to These Terms</h2>
          <p>
            We may update these Terms & Conditions at any time. Continued use of
            our website signifies acceptance of the revised terms.
          </p>
        </section>

        {/* Contact */}
        <section className="terms-section terms-contact">
          <h2>📩 Contact Us</h2>
          <p>Email: <a href="mailto:support@aspireths.com">support@aspireths.com</a></p>
          <p>
            Website:{" "}
            <a
              href="https://www.aspirebrand.store"
              target="_blank"
              rel="noreferrer"
            >
              www.aspirebrand.store
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;
