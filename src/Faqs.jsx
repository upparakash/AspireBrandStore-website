import React, { useState } from "react";
import "./Faqs.css";

const faqs = [
    {
        question: "What products does Aspire Brand Store offer?",
        answer:
            "We provide luxury jewelry including rings, earrings, bracelets, necklaces, and custom-made pieces.",
    },
    {
        question: "Do you offer cash on delivery (COD)?",
        answer:
            "Yes, COD is available on selected pin codes. Delivery availability is checked during checkout.",
    },
    {
        question: "Can I return or exchange a product?",
        answer:
            "Yes! Aspire offers a 7-day hassle-free return and exchange policy for unused products in original packaging.",
    },
    {
        question: "Can I cancel my order?",
        answer:
            "Yes, orders can be cancelled before they are shipped. Once shipped, cancellation is not possible.",
    },
   
    {
        question:"What materials are used in your jewelry?",
        answer:
            "Our jewelry is made using high-quality artificial materials such as stainless steel, copper, and carefully crafted imitation stones. Each piece is designed to look elegant and stylish while remaining affordable. We always mention the exact materials in the product description so you know what you’re purchasing."
    },
    {
        question: "How do I place an order?",
        answer:
            "It’s simple! Browse our collections, choose your favorite pieces, add them to your cart, and follow the checkout process. You can pay securely using your preferred payment method."
    },
    {
        question:" What payment options do you offer?",
        answer:
            "We accept all major credit/debit cards, net banking, UPI, and CASH ON DELIVERY. Your payment details are fully secure with us."
    },
    {
        question:"how long does delivery take?",
        answer:
            "Domestic orders usually arrive within 3–7 business days. Depending on how you are situated, national shipments may take anywhere from seven to twenty-one business days. As soon as your order ships, you will receive a tracking number."
    },
    {   question:"Can I track my order?",
        answer:
            "Of course! We are going to send you a tracking number as soon as your order ships. The status is continuously accessible to you to verify."
    },
    {
        question:"Can I cancel or change my order?",
        answer:
            "If you need to cancel or modify your order, please contact us within 24 hours of placing it. We’ll do our best to accommodate your request before the order is processed."
    },
    {
        question:"What is your return and exchange policy?",
        answer:
            "We accept returns and exchanges within 2-3 days of delivery. Items must be unused, in their original packaging, and accompanied by the receipt. Please note that personalized or engraved pieces cannot be returned."
    }
];

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Filter FAQs based on search input
    const filteredFaqs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="faq-container">

            {/* Title */}
            <h1 className="faq-title">Frequently Asked Questions</h1>
            <p className="faq-subtitle">
                Answers to the most common questions about Aspire Brand Store.
            </p>

            {/* Search Bar */}
            <div className="faq-search">
                <input
                    type="text"
                    placeholder="Search your question..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* FAQ List */}
            <div className="faq-list">
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item ${openIndex === index ? "open" : ""
                                }`}
                        >
                            <div className="faq-question" onClick={() => toggleFAQ(index)}>
                                <h3>{faq.question}</h3>
                                <span>{openIndex === index ? "-" : "+"}</span>
                            </div>

                            {openIndex === index && (
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="no-results">No matching questions found.</p>
                )}
            </div>

            {/* Contact Support Section */}
            <div className="contact-support">
                <h2>Still have questions?</h2>
                <p>We're here to help! Reach out to our support team anytime.</p>

                <div className="support-buttons">
                    <a href="/contact" className="btn-support">Contact Us</a>
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=hr@aspireths.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-email"
                    >
                        Email Support
                    </a>

                </div>
            </div>
        </div>
    );
};

export default FAQPage;
