import React from "react";
import "./ReturnRefund.css";

const ReturnAndRefund = () => {
  return (
    <div className="return-refund-page">
      <div className="policy-container">
        <h2 className="policy-title">🔄 Return & Refund Policy</h2>

        <p className="policy-intro">
          At <strong>Aspire Enterprises</strong>, we take quality and customer
          trust seriously. Every product is thoroughly checked before dispatch.
          However, we understand that issues may occasionally arise during
          transit.
        </p>

        {/* Returns Eligibility */}
        <section className="policy-section">
          <h3>✅ Returns Eligibility</h3>
          <p>Returns are accepted <strong>only</strong> in the following cases:</p>
          <ul>
            <li>Transit damage</li>
            <li>Manufacturing defects</li>
          </ul>
          <p className="note">
            No returns will be accepted for reasons other than the above.
          </p>
        </section>

        {/* Reporting Timeline */}
        <section className="policy-section">
          <h3>⏱ Reporting Timeline</h3>
          <ul>
            <li>Issues must be reported within <strong>24 hours</strong> of delivery</li>
            <li>Requests raised after 24 hours will not be considered</li>
          </ul>
        </section>

        {/* Proof Required */}
        <section className="policy-section">
          <h3>📸 Proof Required</h3>
          <p>Please share the following for smooth processing:</p>
          <ul>
            <li>Uncut unboxing video of the damaged/defective product</li>
            <li>Original packaging images or videos (if available)</li>
          </ul>
        </section>

        {/* Resolution Options */}
        <section className="policy-section">
          <h3>🔁 Resolution Options</h3>
          <p>Once the issue is verified, we will offer one of the following:</p>
          <ul>
            <li><strong>Replacement of the product</strong></li>
            <li><strong>Credit Note</strong> (usable for future purchases)</li>
          </ul>
          <p className="note">
            Refunds in cash or to the original payment method are
            <strong> not applicable</strong>.
          </p>
        </section>

        {/* Non Returnable */}
        <section className="policy-section">
          <h3>🚫 Non-Returnable Items</h3>
          <ul>
            <li>Products damaged due to misuse or improper handling</li>
            <li>Minor color or design variations</li>
            <li>Items reported after the 24-hour window</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="policy-section contact-section">
          <h3>📩 How to Raise a Request</h3>
          <p>
            Please contact our support team within <strong>24 hours</strong> of
            delivery with your order details and proof.
          </p>
          <p className="support-email">
            📧 <a href="mailto:support@aspirebrand.store">
              support@aspirebrand.store
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default ReturnAndRefund;
