import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import SavedRecipes from './pages/SavedRecipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MealPlanner from './pages/MealPlanner';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './context/AuthContext';

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Helmet>
            <title>CulinAIry - AI-Powered Recipe Generator & Meal Planner</title>
            <meta name="description" content="Generate delicious recipes with ingredients you already have and create personalized meal plans with our AI-powered culinary assistant." />
          </Helmet>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='/meal-planner' element={<ProtectedRoute><MealPlanner /></ProtectedRoute>} />
            <Route
              path="/saved-recipes"
              element={
                <ProtectedRoute>
                  <SavedRecipes />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
