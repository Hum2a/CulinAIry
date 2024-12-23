import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} <span className="footer-brand">Culin<span>AI</span>ry</span>. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="/privacy" className="footer-link">Privacy Policy</a>
          <a href="/terms" className="footer-link">Terms of Service</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Made with ❤️ for food lovers and AI enthusiasts</p>
      </div>
    </footer>
  );
};

export default Footer;
