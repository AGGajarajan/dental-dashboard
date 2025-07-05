import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} ENTNT Dental Center. All rights reserved.</p>
        <p>Contact: info@entnt.in | Phone: +91 12345 67890</p>
      </div>
    </footer>
  );
};

export default Footer;
