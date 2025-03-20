import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
    <>
      <Helmet>
        <title>CulinAIry - AI-Powered Recipe Generator & Meal Planner</title>
        <meta name="description" content="Transform your ingredients into delicious recipes with AI. CulinAIry helps you create meals from what you already have in your kitchen." />
        <meta name="keywords" content="recipe generator, cooking, AI, ingredients, meal planning" />
        <link rel="canonical" href="https://culinairy.app/" />
      </Helmet>
      
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
    </>
  );
};

export default Home;
