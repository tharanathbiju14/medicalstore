import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./loginpage.css";
import CircularProgress from '@mui/material/CircularProgress';

function Form({ option }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true); 
    try {
      let response;
      if (option === 1) {
        // Sign in
        response = await axios.post('http://192.168.1.48:8080/api/auth/admin/login', { email, password });
      } else if (option === 2) {
        // Sign up
        response = await axios.post('/api/register', { email, password, repeatPassword });
      } else {
        // Reset password
        response = await axios.post('/api/reset-password', { email });
      }
      console.log('Response:', response.data);
      // Navigate to landing page on successful response
      navigate('/landingpage');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid credentials');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000); // Clear the error message after 3 seconds
      } else {
        console.error('Error:', error);
      }
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <form className="account-form" onSubmit={handleSubmit}>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {loading && <div className="loader-container"><CircularProgress sx={{ color: '#ffffff' }} /></div>}
      <div
        className={
          'account-form-fields ' +
          (option === 1
            ? 'sign-in'
            : option === 2
            ? 'sign-up'
            : 'forgot')
        }
      >
        <input
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={option === 1 || option === 2}
          disabled={option === 3}
        />
        {option === 2 && (
          <input
            id="repeat-password"
            name="repeat-password"
            type="password"
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        )}
      </div>
      <button className="btn-submit-form" type="submit" disabled={loading}>
        {option === 1
          ? 'Sign in'
          : option === 2
          ? 'Sign up'
          : 'Reset password'}
      </button>
    </form>
  );
}

function LoginPage() {
  const [option, setOption] = useState(1);

  return (
    <div className="container">
      <header>
        <div
          className={
            'header-headings ' +
            (option === 1
              ? 'sign-in'
              : option === 2
              ? 'sign-up'
              : 'forgot ')
          }
        >
          <span>Sign in to your  account</span>
          <span>Create an account</span>
          <span>Reset your password!</span>
        </div>
      </header>
      <ul className="options">
        <li
          className={option === 1 ? 'active' : ''}
          onClick={() => setOption(1)}
        >
          Sign in
        </li>
        <li
          className={option === 2 ? 'active' : ''}
          onClick={() => setOption(2)}
        >
          Sign up
        </li>
        <li
          className={option === 3 ? 'active' : ''}
          onClick={() => setOption(3)}
        >
          Forgot?
        </li>
      </ul>
      <Form option={option} />
    </div>
  );
}

export default LoginPage;
