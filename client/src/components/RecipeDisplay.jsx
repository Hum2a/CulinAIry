import React from 'react';
import '../styles/RecipeDisplay.css';

const RecipeDisplay = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className="recipe-display">
      <h2 className="recipe-title">Generated Recipe</h2>
      <p className="recipe-content">{recipe}</p>
    </div>
  );
};

export default RecipeDisplay;