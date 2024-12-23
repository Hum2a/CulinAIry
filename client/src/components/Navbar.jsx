import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">Culin<span>AI</span>ry</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li>
          <Link to="/about" className="navbar-link">About</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/meal-planner" className="navbar-link">Meal Planner</Link>
            </li>
            <li>
              <Link to="/saved-recipes" className="navbar-link">Saved Recipes</Link>
            </li>
            <li>
              <Link to="/profile" className="navbar-link">Profile</Link>
            </li>
            <li>
              <button onClick={logout} className="navbar-logout">Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="navbar-link">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
