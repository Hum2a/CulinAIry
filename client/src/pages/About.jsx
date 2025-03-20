import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import '../styles/About.css';

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>About CulinAIry - Our AI Cooking Assistant Story</title>
        <meta name="description" content="Learn about CulinAIry, an AI-powered recipe generator that helps you create delicious meals using ingredients you already have at home." />
        <meta name="keywords" content="about CulinAIry, AI cooking, kitchen assistant, recipe technology" />
        <link rel="canonical" href="https://culinairy.app/about" />
      </Helmet>
      
      <div className={`about ${isLoaded ? 'loaded' : ''}`}>
        <div className="background-animation">
          <div className="gradient-sphere"></div>
          <div className="gradient-sphere"></div>
        </div>
        
        <div className="content-wrapper">
          <h1 className="about-title">
            About <span className="highlight">CulinAIry</span>
          </h1>
          
          <div className="about-card glass-morphism">
            <p className="about-content">
              CulinAIry is an AI-powered recipe generator that helps you create delicious meals using the ingredients you have at home.
              Our mission is to simplify cooking and inspire creativity in the kitchen.
            </p>
            
            <div className="feature-grid">
              <div className="feature">
                <div className="feature-icon">🤖</div>
                <h3>AI-Powered</h3>
                <p>Advanced algorithms for perfect recipe matching</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🥘</div>
                <h3>Creative Cooking</h3>
                <p>Transform ordinary ingredients into extraordinary meals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;