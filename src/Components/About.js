import React from "react";
import "../Pages/About.css";
import { FaCheck, FaUsers, FaEnvelope, FaPhone } from "react-icons/fa";

const About = () => {
  return (
    <div className="about-container">
      <section className="about-card about-intro">
        <h1>About ChatApp</h1>
        <p>
          Welcome to ChatApp, the ultimate platform for connecting and
          communicating with friends and groups. Our mission is to make
          communication seamless and enjoyable for everyone.
        </p>
      </section>

      <section className="about-card about-features">
        <h2>Features</h2>
        <ul>
          <li>
            <FaCheck /> Real-time messaging with groups
          </li>
          <li>
            <FaCheck /> Group chat functionality
          </li>
          <li>
            <FaCheck /> Search and filter users
          </li>
          <li>
            <FaCheck /> Secure login and registration
          </li>
          <li>
            <FaCheck /> User profile management
          </li>
          <li>
            <FaCheck /> Responsive design for all devices
          </li>
        </ul>
      </section>

      <section className="about-card about-benefits">
        <h2>Benefits</h2>
        <p>
          ChatApp offers a range of benefits to enhance your communication
          experience:
        </p>
        <ul>
          <li>
            <FaCheck /> Instant connection with friends and groups
          </li>
          <li>
            <FaCheck /> Secure and private messaging
          </li>
          <li>
            <FaCheck /> Easy to use interface
          </li>
          <li>
            <FaCheck /> Regular updates with new features
          </li>
          <li>
            <FaCheck /> 24/7 customer support
          </li>
        </ul>
      </section>

      <section className="about-card about-team">
        <h2>Our Team</h2>
        <p>
          Our team is composed of passionate and experienced professionals
          dedicated to providing the best communication experience possible.
          Meet the team:
        </p>
        <ul>
          <li>
            <FaUsers /> Yash Panchal - Lead Developer
          </li>
          <li>
            <FaUsers /> Milan Dharani - Support & Guidance
          </li>
          <li>
            <FaUsers /> Aksh Darji - UI/UX Advisor
          </li>
        </ul>
      </section>

      <section className="about-card about-contact">
        <h2>Contact Us</h2>
        <p>
          Have questions or feedback? We'd like to hear from you. Reach out to
          us at:
        </p>
        <p>
          <FaEnvelope /> Email: support@chatapp.com
        </p>
        <p>
          <FaPhone /> Phone: (123) 456-7890
        </p>
      </section>
    </div>
  );
};

export default About;
