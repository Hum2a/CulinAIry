const { db } = require('../../../client/src/firebase');

const saveRecipe = async (req, res) => {
  try {
    const { userId, recipe } = req.body;

    if (!userId || !recipe) {
      return res.status(400).json({ error: 'User ID and recipe are required.' });
    }

    const docRef = await db.collection('recipes').add({
      userId,
      recipe,
      createdAt: new Date(),
    });

    res.status(200).json({ message: 'Recipe saved successfully!', id: docRef.id });
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ error: 'Failed to save recipe.' });
  }
};

const getSavedRecipes = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const snapshot = await db.collection('recipes').where('userId', '==', userId).get();
    const recipes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ recipes });
  } catch (error) {
    console.error('Error fetching saved recipes:', error);
    res.status(500).json({ error: 'Failed to retrieve recipes.' });
  }
};

module.exports = { saveRecipe, getSavedRecipes };
