import React from 'react';
import axios from 'axios';

const DeleteExpenses = ({ expense, onDelete }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/expenses/${expense._id}`);
            onDelete(expense._id); // Callback to update the list in parent component
        } catch (error) {
            console.error('Error deleting expense:', error.response?.data.message);
        }
    };

    return (
        <li>
            {expense.name} - ${expense.amount} - {expense.category} - {expense.date}
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
};

export default DeleteExpenses;