// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

// Function to add an expense
export const addExpense = async (expense) => {
  try {
    const response = await axios.post(`${API_URL}/expenses`, expense);
    return response.data;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

// Function to get expenses
export const getExpenses = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/expenses`, { params });
    return response.data;
  } catch (error) {
    console.error('Error getting expenses:', error);
    throw error;
  }
};

// Function to delete an expense
export const deleteExpense = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};

// Function to update an expense
export const updateExpense = async (id, expense) => {
  try {
    const response = await axios.put(`${API_URL}/expenses/${id}`, expense);
    return response.data;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};
