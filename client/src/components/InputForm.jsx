import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import '../styles/InputForm.css';

const InputForm = ({ onRecipeGenerated }) => {
  const [ingredients, setIngredients] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({});
  const [recipe, setRecipe] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPreferences(docSnap.data().preferences || {});
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    fetchPreferences();
  }, [user]);

  const handleInputChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddField = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveField = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredIngredients = ingredients.filter((ingredient) => ingredient.trim() !== '');
    if (filteredIngredients.length === 0) return alert('Please enter at least one ingredient.');

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_PUBLIC_URL}/api/recipes/generate`, {
        ingredients: filteredIngredients,
        preferences,
      });
      const generatedRecipe = response.data.recipe;
      setRecipe(generatedRecipe);
      onRecipeGenerated(generatedRecipe);
    } catch (error) {
      console.error('Error generating recipe:', error);
      alert('Failed to generate recipe. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async () => {
    if (!user || !recipe) return alert('You need to be logged in to save recipes.');

    try {
      const docRef = doc(db, 'users', user.uid, 'savedRecipes', new Date().toISOString());
      await setDoc(docRef, { recipe, createdAt: new Date() });
      alert('Recipe saved successfully!');
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe.');
    }
  };

  return (
    <div className="input-form-container">
      <form onSubmit={handleSubmit} className="input-form">
        <h1 className="form-title">Generate Your Recipe</h1>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-field">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
              className="input-text"
            />
            <button
              type="button"
              className="remove-button"
              onClick={() => handleRemoveField(index)}
            >
              ✖
            </button>
          </div>
        ))}
        <button type="button" className="add-button" onClick={handleAddField}>
          + Add Ingredient
        </button>
        <button type="submit" className="input-button">
          {loading ? 'Generating...' : 'Generate Recipe'}
        </button>
      </form>
      {recipe && (
        <div className="recipe-container">
          <h2 className="generated-recipe-title">Generated Recipe</h2>
          <p className="recipe-content">{recipe}</p>
          <button onClick={handleSaveRecipe} className="save-button">
            Save Recipe
          </button>
        </div>
      )}
    </div>
  );
};

export default InputForm;
