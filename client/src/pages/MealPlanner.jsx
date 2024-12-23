import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/MealPlanner.css';

const MealPlanner = () => {
  const [mealsPerDay, setMealsPerDay] = useState('');
  const [days, setDays] = useState('');
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!user) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/saved/${user.uid}`);
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
    try {
      const response = await axios.post('http://localhost:5000/api/meal-planner/generate', {
        savedRecipes,
        mealsPerDay: Number(mealsPerDay),
        days: Number(days),
      });
      setMealPlan(response.data.mealPlan);
    } catch (error) {
      console.error('Error generating meal plan:', error);
    }
  };

  return (
    <div className="meal-planner">
      <h1 className="title">Meal Planner</h1>
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="days" className="form-label">Days</label>
          <input
            id="days"
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="Enter number of days"
            className="form-input"
          />
        </div>
        <button onClick={handleGenerateMealPlan} className="form-button">
          Generate Meal Plan
        </button>
      </div>
      {mealPlan.length > 0 && (
        <div className="meal-plan">
          {mealPlan.map((dayPlan, index) => (
            <div key={index} className="day-plan">
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
  );
};

export default MealPlanner;
