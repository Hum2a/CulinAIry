import React, { useEffect, useState } from 'react';
import { doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import RecipeDisplay from '../components/RecipeDisplay';
import '../styles/SavedRecipes.css';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!user) return;

      try {
        const savedRecipesRef = collection(db, 'users', user.uid, 'savedRecipes');
        const querySnapshot = await getDocs(savedRecipesRef);
        const recipes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSavedRecipes(recipes);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      }
    };

    fetchSavedRecipes();
  }, [user]);

  const handleExpandRecipe = (recipeId) => {
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId);
  };

  return (
    <div className="saved-recipes">
      <h1 className="saved-recipes-title">Your Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <p className="saved-recipes-message">No saved recipes yet. Start generating some!</p>
      ) : (
        <div className="saved-recipes-list">
          {savedRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-summary" onClick={() => handleExpandRecipe(recipe.id)}>
                {recipe.recipe.split('\n')[0]} {/* Display the first line */}
              </div>
              {expandedRecipe === recipe.id && (
                <div className="recipe-details">
                  <RecipeDisplay recipe={recipe.recipe} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
