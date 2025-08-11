import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import { Images } from '../../Constants';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = () => {
    if (!email.trim()) {
      setError('Enter email address');
    } else if (!validateEmail(email)) {
      setError('Please enter valid email');
    } else {
      setError('');
      navigate('/dashboard');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!value.trim()) setError('Enter email address');
    else if (!validateEmail(value)) setError('Please enter valid email');
    else setError('');
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="heading-main">Anyone can give exams</h1>
        <h2 className="sub-heading">with Online Exam Portal</h2>
        <p className="desc-text">Hands-on testing platform with domain-based evaluations</p>

        <div className="input-wrapper">
          <FaEnvelope className="icon" />
          <input
            type="text"
            placeholder="Email address"
            className={`input-field ${error ? 'input-error' : ''}`}
            value={email}
            onChange={handleInputChange}
          />
        </div>
        {error && <p className="error-message">{error}</p>}

        <p className="agreement-text">
          By logging in, you agree to our{' '}
          <a href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a> and{' '}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
        </p>

        <button className="login-btn" onClick={handleLogin}>
          <FaLock style={{ marginRight: 8 }} /> Log in
        </button>

        <p className="signup-text">
          Don’t have an account? <a href="#">Sign up</a>
        </p>
      </div>

      <div className="login-right">
        <img src={Images.Banner} alt="Banner" className="banner-img" />
      </div>
    </div>
  );
};

export default Login;
