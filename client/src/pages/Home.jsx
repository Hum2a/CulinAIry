import React, { useState, useEffect } from 'react';
import InputForm from '../components/InputForm';
import RecipeDisplay from '../components/RecipeDisplay';
import '../styles/Home.css';

const Home = () => {
  const [recipe, setRecipe] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`home ${isLoaded ? 'loaded' : ''}`}>
      <div className="background-animation">
        <div className="gradient-sphere"></div>
        <div className="gradient-sphere"></div>
      </div>
      
      <div className="content-wrapper">
        <h1 className="title">
          <span className="tech">Culin</span>
          <span className="ai">AI</span>
          <span className="tech">ry</span>
          <div className="subtitle">Where AI Meets Cuisine</div>
        </h1>
        
        <p className="description">
          Transform your ingredients into culinary masterpieces with the power of artificial intelligence
        </p>
        
        <div className="form-container glass-morphism">
          <InputForm onRecipeGenerated={setRecipe} />
        </div>
        
        <div className="recipe-container glass-morphism">
          <RecipeDisplay recipe={recipe} />
        </div>
      </div>
    </div>
  );
};

export default Home;
