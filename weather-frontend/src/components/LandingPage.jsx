import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../style/LandingPage.css';

const LandingPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true); // Start with login form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const url = isLogin
      ? 'http://localhost:8081/api/auth/login'
      : 'http://localhost:8081/api/auth/signup';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || 'Login/Signup failed');
      }

      const data = await res.json();
      console.log('User data:', data);

      // Successfully logged in
      onLoginSuccess(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Login/Signup failed');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setError('');
  };

  return (
    <div className="landing-page">
      <div className="background" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2060&q=80)'
      }}/>
      <div className="overlay"/>

      <div className="content">
        <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          WeatherVibe
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Your Perfect Forecast Awaits
        </motion.p>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="form-container">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" required />
            )}
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" required />
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" required />
            <button type="submit" className="primary-btn">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          {error && <p className="error">{error}</p>}

          <button onClick={toggleForm} className="toggle-btn">
            {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
          </button>

          <div className="divider"><div></div><span>OR</span><div></div></div>

          <button onClick={() => onLoginSuccess(null)} className="guest-btn">
            Continue as Guest
          </button>
        </motion.div>

        <p className="footer">
          Access real-time weather data and forecasts for any location worldwide
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
