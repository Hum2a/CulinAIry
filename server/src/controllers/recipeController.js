const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

// Initialize OpenAI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this key is defined in .env
});

const openai = new OpenAIApi(configuration);

const generateRecipe = async (req, res) => {
  try {
    const { ingredients } = req.body;

    const prompt = `Generate a recipe using these ingredients: ${ingredients.join(', ')}`;
    const response = await openai.createChatCompletion({
      model: 'gpt-4', // Or 'gpt-3.5-turbo'
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });

    res.status(200).json({ recipe: response.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error generating recipe:', error);
    res.status(500).json({ error: 'Failed to generate recipe' });
  }
};

module.exports = { generateRecipe };
