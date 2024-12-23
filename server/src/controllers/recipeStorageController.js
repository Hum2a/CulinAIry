const db = require('../firebase/firebaseAdmin'); // Adjust path relative to this file

const getSavedRecipes = async (req, res) => {
  try {
      const { uid } = req.params;
      const savedRecipesSnapshot = await db.collection('users').doc(uid).collection('savedRecipes').get();

      const savedRecipes = savedRecipesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      }));

      res.status(200).json({ recipes: savedRecipes });
  } catch (error) {
      console.error('Error fetching saved recipes:', error);
      res.status(500).json({ error: 'Failed to fetch saved recipes.' });
  }
};

module.exports = { getSavedRecipes };

