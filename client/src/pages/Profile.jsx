import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    displayName: '',
    diet: '',
    customDiet: '',
    theme: '',
    notifications: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
          setFormData({
            displayName: docSnap.data().displayName || '',
            diet: docSnap.data().preferences?.diet || '',
            customDiet: docSnap.data().preferences?.customDiet || '',
            theme: docSnap.data().preferences?.theme || '',
            notifications: docSnap.data().preferences?.notifications || false,
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        displayName: formData.displayName,
        preferences: {
          diet: formData.diet,
          customDiet: formData.customDiet,
          theme: formData.theme,
          notifications: formData.notifications,
        },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">Your Profile</h1>
      <div className="profile-form">
        <label>
          Display Name:
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />
        </label>
        <label>
          Dietary Preference:
          <select name="diet" value={formData.diet} onChange={handleChange}>
            <option value="">None</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Custom">Custom</option>
          </select>
        </label>
        {formData.diet === 'Custom' && (
          <label>
            Custom Dietary Preference:
            <input
              type="text"
              name="customDiet"
              value={formData.customDiet}
              onChange={handleChange}
              placeholder="Enter your custom preference"
            />
          </label>
        )}
        <label>
          Theme:
          <select name="theme" value={formData.theme} onChange={handleChange}>
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
        </label>
        <label>
          Notifications:
          <input
            type="checkbox"
            name="notifications"
            checked={formData.notifications}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default Profile;
