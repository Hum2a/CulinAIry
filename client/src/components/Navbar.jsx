import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">CulinAIry</div>
      <ul className="navbar-links">
        <li><a href="/" className="navbar-link">Home</a></li>
        <li><a href="/about" className="navbar-link">About</a></li>
        <li><a href="/saved-recipes" className="navbar-link">Saved Recipes</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;