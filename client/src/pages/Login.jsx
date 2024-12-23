import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { auth, googleProvider } from '../firebase';
import '../styles/Login.css';

const Login = () => {
  const [isLoginExpanded, setIsLoginExpanded] = useState(true);
  const [isRegisterExpanded, setIsRegisterExpanded] = useState(false);
  const navigate = useNavigate();

  const db = getFirestore();

  const createUserInFirestore = async (user) => {
    if (!user) return;

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Anonymous',
        createdAt: new Date(),
      }, { merge: true });
      console.log('User document created/updated in Firestore');
    } catch (error) {
      console.error('Error creating user document:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const displayName = user.displayName || 'Anonymous';

      await createUserInFirestore({
        uid: user.uid,
        email: user.email,
        displayName,
      });

      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      await createUserInFirestore(user);

      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Email login failed:', error);
      alert('Invalid email or password.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      await createUserInFirestore(user);

      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error registering new user:', error);
      alert('Failed to register account.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-column">
        <h2 className="login-title hover-effect" onClick={() => setIsLoginExpanded(!isLoginExpanded)}>
          Login to CulinAIry
        </h2>
        {isLoginExpanded && (
          <form onSubmit={handleEmailLogin} className="login-form">
            <input type="email" name="email" placeholder="Email" className="login-input" required />
            <input type="password" name="password" placeholder="Password" className="login-input" required />
            <button type="submit" className="login-button">Login</button>
          </form>
        )}
      </div>

      <div className="register-column">
        <h2 className="register-title hover-effect" onClick={() => setIsRegisterExpanded(!isRegisterExpanded)}>
          Register for CulinAIry
        </h2>
        {isRegisterExpanded && (
          <form onSubmit={handleRegister} className="register-form">
            <input type="email" name="email" placeholder="Email" className="register-input" required />
            <input type="password" name="password" placeholder="Password" className="register-input" required />
            <button type="submit" className="register-button">Register</button>
          </form>
        )}
      </div>
      <button onClick={handleGoogleLogin} className="google-login-button">
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" />
          Sign in with Google
        </button>
    </div>
  );
};

export default Login;
