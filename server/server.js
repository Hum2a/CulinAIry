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
app.use('/api/login', loginRouter);


// Start the server

const path = require('path');

// Serve React app
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
