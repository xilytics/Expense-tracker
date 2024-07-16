import React, { useState } from 'react';
import ExpenseService from '../services/ExpenseService';
import { Redirect } from 'react-router-dom';


const EditExpense = ({ expense, onUpdate }) => {
    const [amount, setAmount] = useState(expense.amount);
    const [category, setCategory] = useState(expense.category);
  
    const handleEditExpense = async () => {
      try {
        await ExpenseService.editExpense(expense._id, { amount, category });
        onUpdate();
        alert('Expense updated successfully');
      } catch (err) {
        alert('Error updating expense');
      }
    };
  
    return (
      <div>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button onClick={handleEditExpense}>Update</button>
      </div>
    );
  };
  
  export default EditExpense;
