import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">

      <div className="about-hero">
        <h1>About Aspire Brand Store</h1>
        <p>Your trusted destination for quality, innovation & everyday convenience.</p>
      </div>

      <div className="about-content">

        {/* OUR STORY */}
        <section className="about-card">
          <h2>Our Story</h2>
          <p>
            Aspire Brand Store was founded with one simple goal — to make quality, innovation,
            and trust the foundation of your shopping experience.
            Powered by Aspire Tekhub Solutions, a leading digital and product development
            company based in Hyderabad, we bring you a modern retail platform that blends
            technology, reliability, and everyday convenience. What started as a vision to
            bridge the gap between brands and buyers has now evolved into a trusted online store
            offering handpicked products across tech, lifestyle, home essentials, and more.
          </p>
        </section>

        {/* MISSION */}
        <section className="about-split">
          <div className="about-box">
            <h2>Our Mission</h2>
            <p>
              To provide customers with authentic, affordable, and value-driven products backed by
              smooth service and secure shopping. We’re dedicated to building long-term trust —
              not just one-time transactions.
            </p>
          </div>

          <div className="about-box">
            <h2>Our Vision</h2>
            <p>
              To be recognized as one of India’s most reliable and customer-centric e-commerce
              brands — known for integrity, innovation, and satisfaction in every purchase.
            </p>
          </div>
        </section>

        {/* PROMISE LIST */}
        <section className="about-card2">
          <h2>Our Promise</h2>

          <ul className="promise-list">
            <li>✅ 100% Genuine & Verified Products</li>
            <li>🚚 Fast & Reliable Delivery</li>
            <li>🔒 Secure Payments</li>
            <li>🤝 Friendly Customer Support</li>
            <li>🎁 Exclusive Deals & Offers</li>
          </ul>
        </section>

        {/* TEKHUB */}
        <section className="about-card">
          <h2>Powered by Aspire Tekhub Solutions</h2>
          <p>
            Aspire Tekhub Solutions, driven by innovation and digital excellence, powers our
            platform with technology and product development expertise — ensuring a smooth,
            smart, and satisfying shopping experience.
          </p>
        </section>

        {/* FINAL MESSAGE */}
        <section className="about-highlight">
          <h2>Experience the Difference</h2>
          <p>
            Shopping isn't just about what you buy — it's about how you feel while buying.
            Discover a world of reliable products, transparent service, and a brand that truly
            cares. <br />
            <strong>Shop Smart. Shop Confident. Shop Aspire.</strong>
          </p>
        </section>

      </div>
    </div>
  );
};

export default About;
