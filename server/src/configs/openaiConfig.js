const OpenAI = require('openai');
require('dotenv').config(); // Ensure this is included at the top of the file

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This should now load the key from .env
});

module.exports = { openai };
