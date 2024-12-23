import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-logo">Culin<span>AI</span>ry</a>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/" className="navbar-link">Home</a>
        </li>
        <li>
          <a href="/about" className="navbar-link">About</a>
        </li>
        {user ? (
          <>
            <li>
              <a href="/meal-planner" className="navbar-link">Meal Planner</a>
            </li>
            <li>
              <a href="/saved-recipes" className="navbar-link">Saved Recipes</a>
            </li>
            <li>
              <a href="/profile" className="navbar-link">Profile</a>
            </li>
            <li>
              <button onClick={logout} className="navbar-logout">Logout</button>
            </li>
          </>
        ) : (
          <li>
            <a href="/login" className="navbar-link">Login</a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
