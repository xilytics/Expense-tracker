import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; 
import styles from './SignUp.module.css';
import waveIcon from '../visuals/wave.svg';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (password===confirmPassword){
        setPasswordsMatch(true);
        console.log('Sending Request Data:', { email, password });
        const response = await axios.post('http://localhost:5001/api/auth/register', { email, password });
        console.log('Signup successful', response.data);
        localStorage.setItem('userId', response.data.userId);
        navigate('/ExpenseList');
      }else {
        setPasswordsMatch(false);
        console.log("Passwords do not match.");
      }
    }catch (err) {
      console.error('Signup failed:', err.response ? err.response.data : err.message);
      if (err.response && err.response.data) {
        // Display backend validation errors if any
        alert(`Error: ${err.response.data.message}`);
    } else {
        // General error handling
        alert('An error occurred. Please try again.');
      }
    }
};

  return (
    <div className={styles.container}>
    <h2 ><span className={styles.welcome}>Join </span>us! <img src={waveIcon} alt="Wave" /></h2>
    <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          type="email" 
          value={email} 
          className={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} required />
        <input 
          type="password" 
          value={password} 
          className={styles.input}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} required />
        <input 
          type="password"
          value={confirmPassword} 
          className={styles.input}
          placeholder="Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)} required />
      <button type="submit" className={styles.button}>Sign Up</button>
      {!passwordsMatch && (
                <p style={{ color: 'red', textAlign:'center' }}>Passwords do not match!</p>
            )}
      <p className={styles.requireSignup}>
      Already have an account? <Link to="/" className={styles.SignupLink}>Log in</Link>
      </p>    
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </form>
  </div>
  );
};

export default SignUp;
