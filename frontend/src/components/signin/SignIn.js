import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './SignIn.module.css'; 
import waveIcon from './visuals/wave.svg';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/signin', { email, password });
      // Optionally, save the token in localStorage or context for authenticated routes
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.id);
      navigate('/ExpenseList');
    } catch (err) {
        console.error('Login failed:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 ><span className={styles.welcome}>Welcome </span>back! <img src={waveIcon} alt="Wave" /></h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required

        />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Remember my details
        </label>
        <button type="submit" className={styles.button}>Sign In</button>
        <p className={styles.requireSignup}>
          Don't have an account? <Link to="/signup" className={styles.SignupLink}>Sign up here</Link>
        </p>    
      </form>
    </div>
  );
};

export default SignIn;
