import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate  } from 'react-router-dom';
import styles from './SignUp.module.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', { email, password });
      localStorage.setItem('userId', response.data.user.id);
      navigate.push('/expenses');
    } catch (err) {
        console.error('Error signing up:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
