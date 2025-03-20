import React from "react";
import "./Footer.css"; // Import CSS
import logo from "../assets/logo.png"; // Ensure logo exists

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Side: Logo & Company Name */}
        <div className="footer-brand">
          <img src={logo} alt="Company Logo" className="footer-logo" />
          <div>
            <h2>Ceylon Petroleum Corporation</h2>
            <p>ENERGIZING THE FUTURE</p>
          </div>
        </div>

        {/* Right Side: Information Sections */}
        <div className="footer-info">
          <div className="footer-column">
            <h3>Information</h3>
            <ul>
              <li>Annual Reports</li>
              <li>Specification of Fuel Products</li>
              <li>Regional Offices</li>
              <li>Projects</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Information</h3>
            <ul>
              <li>Annual Reports</li>
              <li>Specification of Fuel Products</li>
              <li>Regional Offices</li>
              <li>Projects</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Information</h3>
            <ul>
              <li>Annual Reports</li>
              <li>Specification of Fuel Products</li>
              <li>Regional Offices</li>
              <li>Projects</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
