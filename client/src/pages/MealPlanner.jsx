import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/MealPlanner.css';

const MealPlanner = () => {
  const [mealsPerDay, setMealsPerDay] = useState('');
  const [days, setDays] = useState('');
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setIsLoaded(true);
    const fetchSavedRecipes = async () => {
      if (!user) return;
      try {
        const response = await axios.get(`https://culinairy-server.onrender.com/api/recipes/saved/${user.uid}`);
        setSavedRecipes(response.data.recipes);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      }
    };
    fetchSavedRecipes();
  }, [user]);

  const handleGenerateMealPlan = async () => {
    if (!mealsPerDay || !days) {
      alert('Please fill in all fields.');
      return;
    }
    setIsGenerating(true);
    try {
      const response = await axios.post(`https://culinairy-server.onrender.com/api/meal-planner/generate`, {
        savedRecipes,
        mealsPerDay: Number(mealsPerDay),
        days: Number(days),
      });
      setMealPlan(response.data.mealPlan);
    } catch (error) {
      console.error('Error generating meal plan:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`meal-planner ${isLoaded ? 'loaded' : ''}`}>
      <div className="background-animation">
        <div className="gradient-sphere"></div>
        <div className="gradient-sphere"></div>
      </div>
      
      <div className="content-wrapper">
        <h1 className="title">AI Meal Planner</h1>
        
        <div className="meal-planner-form">
          <div className="form-group">
            <label htmlFor="meals-per-day" className="form-label">Meals Per Day</label>
            <input
              id="meals-per-day"
              type="number"
              value={mealsPerDay}
              onChange={(e) => setMealsPerDay(e.target.value)}
              placeholder="Enter number of meals"
              className="form-input"
              min="1"
              max="6"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="days" className="form-label">Number of Days</label>
            <input
              id="days"
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="Enter number of days"
              className="form-input"
              min="1"
              max="14"
            />
          </div>
          
          <button 
            onClick={handleGenerateMealPlan} 
            className="form-button"
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Meal Plan'}
          </button>
        </div>

        {mealPlan.length > 0 && (
          <div className="meal-plan">
            {mealPlan.map((dayPlan, index) => (
              <div key={index} className="day-plan" style={{animationDelay: `${index * 0.1}s`}}>
                <h2 className="day-title">Day {index + 1}</h2>
                {dayPlan.map((recipe, mealIndex) => (
                  <div key={mealIndex} className="meal-slot">
                    <h3 className="meal-title">Meal {mealIndex + 1}</h3>
                    <p className="meal-content">{recipe.recipe.split('\n')[0]}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlanner;
