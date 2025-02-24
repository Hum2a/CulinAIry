import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          &copy; {new Date().getFullYear()} <span className="footer-brand">Culin<span>AI</span>ry</span>
        </div>
        <div className="footer-links">
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms" className="footer-link">Terms of Service</Link>
          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>
          Made with <FaHeart className="heart-icon" /> for food lovers and AI enthusiasts
        </p>
        <div className="footer-social">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaGithub />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
