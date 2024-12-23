import React, { useState } from 'react';
import axios from 'axios';
import '../styles/InputForm.css';

const InputForm = ({ onRecipeGenerated }) => {
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ingredients) return alert('Please enter ingredients.');

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/recipes/generate', {
        ingredients: ingredients.split(',').map((item) => item.trim()),
      });
      onRecipeGenerated(response.data.recipe);
    } catch (error) {
      console.error('Error generating recipe:', error);
      alert('Failed to generate recipe. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients separated by commas"
        className="input-textarea"
      />
      <button type="submit" className="input-button">
        {loading ? 'Generating...' : 'Generate Recipe'}
      </button>
    </form>
  );
};

export default InputForm;