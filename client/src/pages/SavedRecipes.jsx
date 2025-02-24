import React, { useEffect, useState } from 'react';
import { doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import RecipeDisplay from '../components/RecipeDisplay';
import '../styles/SavedRecipes.css';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!user) return;

      try {
        const savedRecipesRef = collection(db, 'users', user.uid, 'savedRecipes');
        const querySnapshot = await getDocs(savedRecipesRef);
        const recipes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSavedRecipes(recipes);
        setIsLoaded(true);
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
    <div className={`saved-recipes ${isLoaded ? 'loaded' : ''}`}>
      <div className="background-animation">
        <div className="gradient-sphere"></div>
        <div className="gradient-sphere"></div>
      </div>

      <div className="content-wrapper">
        <h1 className="saved-recipes-title">Your Culinary Collection</h1>
        
        {savedRecipes.length === 0 ? (
          <div className="saved-recipes-message">
            No saved recipes yet. Start generating some culinary masterpieces!
          </div>
        ) : (
          <div className="saved-recipes-list">
            {savedRecipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className={`recipe-card ${expandedRecipe === recipe.id ? 'expanded' : ''}`}
                onClick={() => handleExpandRecipe(recipe.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="recipe-summary">
                  {recipe.recipe.split('\n')[0]}
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
    </div>
  );
};

export default SavedRecipes;
