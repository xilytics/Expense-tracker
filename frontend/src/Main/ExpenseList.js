// src/components/ExpenseList.js
import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import styles from './Expenselist.module.css';
import deleteIcon from './delete.svg'


const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [category, setCategory] = useState('');
    const [summary, setSummary] = useState(0);
    const navigate = useNavigate();




    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoggedIn(false);
        }
    }, []);

    const calculateSummary = (expenses) => {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        setSummary(total);
    };
   
    const fetchAllExpenses = useCallback(async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

        };

        try {
            const response = await axios.get(`https://expense-tracker-skm7.onrender.com/api/expenses/overview/`, config);
            setExpenses(response.data);
            setFilteredExpenses(response.data);
            calculateSummary(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error.response?.data.message);
        }
    }, []);

    const fetchFilteredExpenses=useCallback(async()=> {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params: {
                startDate: startDate || undefined,
                endDate: endDate || undefined,
                category: category || undefined
            }
        };
        try {
            const response = await axios.get(`https://expense-tracker-skm7.onrender.com/api/expenses/filter`, config);
            setExpenses(response.data);
            setFilteredExpenses(response.data);
            calculateSummary(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error.response?.data?.message);
        }
    }, [startDate, endDate, category]);

    useEffect(() => {
        if (startDate || endDate || category) {
            fetchFilteredExpenses();
        } else {
            fetchAllExpenses();
        }
    }, [fetchAllExpenses, fetchFilteredExpenses, startDate, endDate, category]);

    if (!isLoggedIn) {
        return <Navigate to="/signin" />;
    }


    const handleDeleteExpense = async(id) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            await axios.delete(`https://expense-tracker-skm7.onrender.com/api/expenses/${id}`, config);
            const updatedExpenses = expenses.filter(expense => expense._id !== id);
            setExpenses(updatedExpenses);
            setFilteredExpenses(updatedExpenses);
            calculateSummary(updatedExpenses);
        } catch (error) {
            console.error('Error deleting expense:', error.response?.data.message);
        }
    };
    

    const navigateToAddExpense = () => {
        navigate('/add');
    };

    return (
        <div>
            <NavigationBar />
            <div className={styles.filters}>
                <div className={styles.filtersection}>
                    <label >Date Range:</label>
                        <input className={styles.startDate} type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                        <input className={styles.endDate} type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    
                
                </div>
                <div  className={styles.filtersection}>
                    <label >Category:</label>
                        
                        <select value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="">All</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Health">Health</option>
                            <option value="Others">Others</option>
                        </select>
                    
                </div>
            </div>
            <div className={styles.buttoncontainer}>
            <button onClick={() => {startDate || endDate || category ? fetchFilteredExpenses() : fetchAllExpenses()}}>Apply Filters</button>
            </div>

            <div className="summary">
                <h2 className={styles.summary}>Total Expenses:</h2>
                <h2 className={styles.summarynumber}>-${summary}</h2>
            </div>
            <div className={styles.buttoncontainer}>
            <button onClick={navigateToAddExpense}>Add Expense</button>
            </div>
            <div className={styles.tablecontainer}>
            <table className={styles.expensetable}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredExpenses.length > 0 ? (
                        filteredExpenses.map((expense, index) => (
                            <tr key={expense._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                <td>{new Date(expense.date).toLocaleDateString()}</td>
                                <td>{expense.name}</td>
                                <td>-${expense.amount}</td>
                                <td>{expense.category}</td>
                                <td>
                                <img src={deleteIcon} alt="DELETE"  onClick={() => handleDeleteExpense(expense._id)}/>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" text-align="center">No expenses yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default ExpenseList;
