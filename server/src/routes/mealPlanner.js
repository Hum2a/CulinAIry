const express = require('express');
const { generateMealPlan } = require('../controllers/mealPlannerController');
const router = express.Router();

router.post('/generate', generateMealPlan);

module.exports = router;
