const { openai } = require('../configs/openaiConfig');

const generateRecipe = async (req, res) => {
  try {
    const { ingredients } = req.body;

    // Validate input
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: 'Ingredients must be a non-empty array.' });
    }

    const prompt = `Generate a recipe using these ingredients: ${ingredients.join(', ')}. Provide detailed steps and measurements.`;
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
    });

    const recipe = response.choices[0].message.content.trim();
    res.status(200).json({ recipe });
  } catch (error) {
    console.error('Error generating recipe:', error);
    res.status(500).json({ error: 'Failed to generate recipe. Please try again later.' });
  }
};

module.exports = { generateRecipe };
