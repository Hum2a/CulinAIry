import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">CulinAIry</div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        {user ? (
          <>
            <li><a href="/meal-planner" className="hover:underline">Meal Planner</a></li>
            <li><a href="/saved-recipes">Saved Recipes</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <li><a href="/login">Login</a></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
