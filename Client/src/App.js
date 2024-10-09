import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Login from './auth/Login';
import Signup from './auth/Signup';
import HomePage from './routes/HomePage';
import PostPage from './routes/PostPage';
import FindQuestionPage from './routes/FindQuestionPage';
import Plans from './routes/Plans';
import Payment from './routes/Payment';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import './App.css';

function App() {
  // State for theme management
  const [theme, setTheme] = useState('light'); // default to 'light' theme

  useEffect(() => {
    const fetchUserTheme = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const isPremium = userDoc.data().isPremium;
          if (isPremium) {
            setTheme('premium'); // Apply the premium theme
          } else {
            setTheme('light'); // Apply the light theme
          }
        }
      }
    };

    // Listen for auth state changes and fetch theme accordingly
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserTheme();
      } else {
        setTheme('light'); // Default to light theme if not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className={`App ${theme}`}> {/* Apply the theme as a class */}
        <Header setTheme={setTheme} /> {/* Pass setTheme as a prop */}
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage theme={theme} />} /> {/* Pass theme prop */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/find-question" element={<FindQuestionPage />} />
            <Route path="/plans" element={<Plans setTheme={setTheme} />} /> {/* Pass setTheme prop */}
            <Route path="/payment" element={<Payment setTheme={setTheme} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
