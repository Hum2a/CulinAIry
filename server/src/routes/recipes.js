const express = require('express');
const { generateRecipe } = require('../controllers/recipeController');
const { saveRecipe, getSavedRecipes } = require('../controllers/recipeStorageController');
const router = express.Router();

router.post('/generate', generateRecipe);       // Generate recipe
router.get('/saved/:uid', getSavedRecipes);    // Retrieve saved recipes

module.exports = router;
