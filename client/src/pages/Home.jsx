import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import RecipeDisplay from '../components/RecipeDisplay';
import '../styles/Home.css';

const Home = () => {
  const [recipe, setRecipe] = useState('');

  return (
    <div className="home">
      <h1>Welcome to CulinAIry</h1>
      <p>
        Discover personalized recipes using ingredients you already have. Enter your ingredients below to get started!
      </p>
      <div className="form-container">
        <InputForm onRecipeGenerated={setRecipe} />
      </div>
      <div className="recipe-container">
        <RecipeDisplay recipe={recipe} />
      </div>
    </div>
  );
};

export default Home;
