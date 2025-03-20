# CulinAIry

CulinAIry is an AI-powered recipe generator and meal planning application. It helps users discover new recipes based on available ingredients and dietary preferences, and create personalized meal plans.

## Features

- **Recipe Generation**: Generate recipes using ingredients you have on hand
- **Personalized Meal Plans**: Create weekly meal plans based on your preferences
- **Save Favorites**: Store your favorite recipes for future reference
- **User Authentication**: Secure login with Firebase authentication
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Material UI components
- TailwindCSS for styling
- Firebase Auth for authentication
- Axios for API requests

### Backend
- Node.js and Express
- OpenAI GPT-4 for recipe generation
- Firebase Admin SDK
- PostgreSQL database

## Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # React context providers
│   │   ├── pages/       # Page components
│   │   ├── styles/      # CSS and styling files
│   │   └── utils/       # Utility functions
│   ├── public/          # Static assets
│   └── package.json     # Frontend dependencies
│
└── server/              # Node.js backend
    ├── src/
    │   ├── controllers/ # API request handlers
    │   ├── routes/      # API endpoints
    │   ├── firebase/    # Firebase configuration
    │   └── configs/     # Configuration files
    ├── server.js        # Main server file
    └── package.json     # Backend dependencies
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- OpenAI API key
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/CulinAIry.git
cd CulinAIry
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Create a `.env` file in the server directory with your configuration:
```
PORT=5000
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_postgres_connection_string
```

4. Install frontend dependencies
```bash
cd ../client
npm install
```

5. Create a `.env` file in the client directory:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

### Running the Application

1. Start the backend server
```bash
cd server
npm run dev
```

2. Start the frontend development server
```bash
cd client
npm start
```

3. Access the application at `http://localhost:3000`

## API Endpoints

- `POST /api/recipes/generate` - Generate a recipe based on ingredients
- `GET /api/recipes/saved/:uid` - Get saved recipes for a user
- `POST /api/meal-planner/generate` - Generate a meal plan

## Future Enhancements

- Recipe sharing functionality
- Nutritional information for recipes
- Advanced dietary restriction filtering
- Shopping list generation from meal plans
- Mobile app version

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 