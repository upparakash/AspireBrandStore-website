import React from 'react'
import Contactlogo from './images/Contactlogo.webp';
import './ContactUs.css';


 const ContactUs = () => {

    return (
        <>
            <div className='main-img'>
                <img src={Contactlogo} alt="Welcome" />
            </div>
            {/* TOP SECTION */}
            <div className="contact-wrapper">
                <p className='Heading'>Let’s Work Together</p>

                <p className='text-side'>
                    Working together to use standardized systems for creating customer-aligned strategies
                    and client-focused solutions. Look for out to Us at
                    <a
                        href="https://aspireths.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="company-name"
                    >
                        Aspire Enterprises
                    </a>
                </p>
            </div>
            <div className="contact-map-flex">
                {/* CONTACT FORM SECTION */}
                <div className="contact-form-container">

                    <form className="contact-form">

                        {/* Name */}
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" placeholder="Enter your name" required />
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="Enter your email" required />
                        </div>

                        {/* Phone with flag */}
                        <div className="form-group">
                            <label>Phone</label>

                            <div className="phone-box">
                                <select className="country">
                                    <option value="+91">IND +91</option>
                                    <option value="+971">AE +1</option>
                                    <option value="+65">SG +65</option>
                                    <option value="+61">🇦🇺s +61</option>
                                    <option value="+1">US +1</option>
                                    <option value="+44">UK +44</option>
                                    <option value="+33">FRA +33</option>
                                </select>
 
                                <input
                                    type="tel"
                                    className="phone-input"
                                    placeholder="Phone number"
                                    required
                                />
                            </div>
                        </div>

                        {/* Services Dropdown */}
                        <div className="form-group">
                            <label>Select a Service</label>
                            <select required>
                                <option value="">Choose a service</option>
                                <option value="web">Website Development</option>
                                <option value="mobile">Mobile App Development</option>
                                <option value="uiux">UI/UX Design</option>
                                <option value="Digital Marketing"> Digital Marketing</option>
                                <option value="WordPress Developing">WordPress Develoment</option>
                                <option value="consulting">IT Consulting</option>
                                <option value="E- commerce Development">E-Commerce Development</option>
                            </select>
                        </div>

                        {/* Message */}
                        <div className="form-group">
                            <label>Comment or Message</label>
                            <textarea
                                placeholder="Write your message here..."
                                rows="5"
                                cols="60"
                                required
                            ></textarea>
                        </div>

                        {/* Submit */}
                        <button className="submit-btn">Submit</button>

                    </form>
                </div>

                {/* MAP SECTION */}

                <div className="contact-map-wrapper">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.096609824811!2d78.4770754750791!3d17.443239383942746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91cfa64620af%3A0x77e498cab170fc7a!2sAspire%20Tekhub%20Solutions%20Pvt%20Limited!5e0!3m2!1sen!2sin!4v1732017431103!5m2!1sen!2sin"
                        width="500"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="contact-map-iframe"
                    ></iframe>

                    <div class="contact-map-info">

                        <p class="contact-map-label">
                            Current Location: <strong>Aspire Enterprises</strong>
                        </p>

                        <p class='cont-heading'>
                            <strong>Contact Us for Quick Support...</strong>
                        </p>

                        <p class='TGS'>Telangana, INDIA</p>

                        <p class='road'>
                             Sardar Patel Road, Rasoolpura
                            Secunderabad Telangana 500003
                        </p>
                        <div className="social-icons">
                            <a href="https://www.instagram.com/aspireths/?hl=en" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>

                            <a href="https://www.facebook.com/people/Aspire-TekHub-Solutions/61565362786512/" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook"></i>
                            </a>

                            <a
                                href="https://www.linkedin.com/company/aspire-tekhub-solutions/?originalSubdomain=in"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>

                    </div>

                </div>
            </div>

            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
            />

        </>
    )
}

export default ContactUs;

