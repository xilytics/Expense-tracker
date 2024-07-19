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

    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
      }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
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
                <input  className={style.input} type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
                <input  className={style.input} type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" required />
                <select className={style.select} value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" required>
                            <option value="">All</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Health">Health</option>
                            <option value="Others">Others</option>
                </select>
                <input className={style.input} type="date" value={date} onChange={e => setDate(e.target.value)} required />
                <button className={style.button} type="submit" >Save Expense</button>
                <button className={style.button} type="button" onClick={handleCancel}>Go Back</button>
            </form>
        </div>
    );
};

export default AddExpensePage;
