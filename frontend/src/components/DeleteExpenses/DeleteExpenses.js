import React from 'react';
import axios from 'axios';

const DeleteExpenses = ({ expense, onDelete }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5001/api/expenses/${expense._id}`);
            onDelete(expense._id); // Callback to update the list in parent component
        } catch (error) {
            console.error('Error deleting expense:', error.response?.data.message);
        }
    };

    return (
        <button onClick={handleDelete}> Delete</button>
    );
};

export default DeleteExpenses;