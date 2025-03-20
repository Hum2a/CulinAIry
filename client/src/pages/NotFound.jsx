import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - CulinAIry</title>
        <meta name="description" content="Sorry, the page you are looking for does not exist. Return to CulinAIry's homepage for AI-powered recipe generation." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <div className="not-found">
        <div className="background-animation">
          <div className="gradient-sphere"></div>
          <div className="gradient-sphere"></div>
        </div>
        
        <div className="content-wrapper">
          <h1 className="not-found-title">404</h1>
          <p className="not-found-subtitle">Page Not Found</p>
          
          <div className="not-found-card glass-morphism">
            <p className="not-found-content">
              Oops! The recipe you're looking for doesn't seem to exist.
            </p>
            
            <div className="recommendation">
              <p>Here are some suggestions:</p>
              <ul>
                <li>Check the URL for typos</li>
                <li>Return to our <Link to="/" className="home-link">homepage</Link></li>
                <li>Try searching for recipes with different ingredients</li>
              </ul>
            </div>
            
            <Link to="/" className="return-button">
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound; 