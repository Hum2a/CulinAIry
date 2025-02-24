import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">Culin<span>AI</span>ry</Link>
      </div>

      <button 
        className={`mobile-menu-button ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      >
        <div className="menu-icon"></div>
      </button>

      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/meal-planner" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                Meal Planner
              </Link>
            </li>
            <li>
              <Link to="/saved-recipes" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                Saved Recipes
              </Link>
            </li>
            <li>
              <Link to="/profile" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>
            </li>
            <li>
              <button 
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }} 
                className="navbar-logout"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
