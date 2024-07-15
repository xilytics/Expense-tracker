import React, { useState } from 'react';
import ExpenseService from '../services/ExpenseService';

const AddExpense = ({ userId }) => {
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');


const handleAddExpense = async () => {
    const expense = { date, amount, category, userId };
    try {
      await ExpenseService.addExpense(expense);
      alert('Expense added successfully');
      setDate('');
      setAmount('');
      setCategory('');
    } catch (err) {
      alert('Error adding expense');
    }
  };

return (
    <div>
      <h2>Add Expense</h2>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      <button onClick={handleAddExpense}>Add</button>
    </div>
  );
};

export default AddExpense;