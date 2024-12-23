const generateMealPlan = async (req, res) => {
    try {
      const { savedRecipes, mealsPerDay, days } = req.body;
  
      if (!savedRecipes || savedRecipes.length === 0) {
        return res.status(400).json({ error: 'No saved recipes available for planning.' });
      }
  
      const mealPlan = [];
      for (let day = 0; day < days; day++) {
        const dailyPlan = [];
        for (let meal = 0; meal < mealsPerDay; meal++) {
          const randomRecipe = savedRecipes[Math.floor(Math.random() * savedRecipes.length)];
          dailyPlan.push(randomRecipe);
        }
        mealPlan.push(dailyPlan);
      }
  
      res.status(200).json({ mealPlan });
    } catch (error) {
      console.error('Error generating meal plan:', error);
      res.status(500).json({ error: 'Failed to generate meal plan.' });
    }
  };
  
  module.exports = { generateMealPlan };
  