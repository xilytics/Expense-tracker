import React, { useState } from 'react';
import styles from './AddExpense.module.css';


import axios from 'axios';

const AddExpense = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/expenses', { name, amount, category, date }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      onAdd(response.data); // Call the onAdd function passed from the parent
      setName('');
      setAmount('');
      setCategory('');
      setDate('');
    } catch (error) {
      console.error('Error adding expense:', error.response?.data.message);
    }
};

return (
    <form onSubmit={handleSubmit} className={styles.form}>

        <input 
        className={styles.input} 
        type="text" 
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="Name" required />
        <input 
        className={styles.input} 
        type="number" 
        value={amount} 
        onChange={e => setAmount(e.target.value)} 
        placeholder="Amount" required />
        <input 
        type="text" 
        className={styles.input} 
        value={category} 
        onChange={e => setCategory(e.target.value)} 
        placeholder="Category" required />
        <input 
        type="date" 
        value={date} 
        className={styles.input} 
        onChange={e => setDate(e.target.value)} required />
        <button type="submit"  className={styles.button} >Add Expense</button>
    </form>
);
};

export default AddExpense;