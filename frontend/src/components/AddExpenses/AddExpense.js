// src/components/AddExpensePage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../Main/NavigationBar';
import style from './AddExpense.module.css'


const AddExpensePage = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const getToken = () => {
      return localStorage.getItem('token');
    };

    


    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = getToken();
        if (!token) {
          console.error('No token found, please log in again.');
          return;
        }
        const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken()}`
          }
        };
        try {
            await axios.post(`https://expense-tracker-skm7.onrender.com/api/expenses/add`, { name, amount, category, date },config);
            navigate('/overview'); // Navigate back to the overview page after adding the expense
        } catch (error) {
            console.error('Error adding expense:', error.response?.data.message);
        }
    };

    const handleCancel = () => {
        navigate('/overview'); // Navigate back to the overview page without adding the expense
    };

    return (
        <div>
          <NavigationBar />
            <h1>Add Expense</h1>
            <form onSubmit={handleSubmit}>
                <input  className={style.inputadd} type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
                <input  className={style.inputadd} type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" required />
                <select className={style.selectadd} value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" required>
                            <option value="">All</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Health">Health</option>
                            <option value="Others">Others</option>
                </select>
                <input  className={style.inputadd} type="date" value={date} placeholder="Date" onChange={e => setDate(e.target.value)} required />
                <button className={style.button} type="submit" >Save Expense</button>
                <button className={style.button} type="button" onClick={handleCancel}>Go Back</button>
            </form>
        </div>
    );
};

export default AddExpensePage;
