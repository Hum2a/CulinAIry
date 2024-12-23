const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

(async () => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: 'Hello, can you provide a recipe for pasta?' }],
      max_tokens: 100,
    });
    console.log(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error with OpenAI:', error);
  }
})();
