import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import AddExpenses from '../components/AddExpenses/AddExpense';
import DeleteExpenses from '../components/DeleteExpenses/DeleteExpenses';
import styles from './Expenselist.module.css';



const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    // Check for user authentication
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
        setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        const fetchExpenses = async () => {
        try {
            const response = await axios.get('/api/expenses', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            });
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error.response?.data.message);
        }
        };
        fetchExpenses();
    }, []);

    if (!isLoggedIn) {
        return <Navigate to="/login" />; // Use Redirect for React Router v5
    }

    const handleAddExpense = (newExpense) => {
        setExpenses([...expenses, newExpense]);
    };

    const handleDeleteExpense = async (id) => {
        try {
        await axios.delete(`/api/expenses/${id}`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (error) {
        console.error('Error deleting expense:', error.response?.data.message);
        }
    };

    return (
        <div>
        <h1 className={styles.title}>Expense Dashboard</h1>
        <AddExpenses onAdd={handleAddExpense} className={styles} />
        <ul>
            {expenses.length > 0 ? (
            expenses.map(expense => (
                <li key={expense._id}>
                {expense.name} - ${expense.amount} - {expense.category} - {new Date(expense.date).toLocaleDateString()}
                <DeleteExpenses id={expense._id} onDelete={handleDeleteExpense} />
                </li>
            ))
            ) : (
            <p text-align='center'>No expenses yet.</p>
            )}
        </ul>
        </div>
    );
    };

    export default ExpenseList;