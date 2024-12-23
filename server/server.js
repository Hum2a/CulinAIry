const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const recipeRoutes = require('./src/routes/recipes');
const mealPlannerRoutes = require('./src/routes/mealPlanner');
const db = require('./src/firebase/firebaseAdmin'); // Adjust path as needed
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/meal-planner', mealPlannerRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
