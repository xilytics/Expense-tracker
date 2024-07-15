import axios from 'axios';

const API_URL = 'http://localhost:5001/expenses';

const addExpense = async (expense) => {
  const response = await axios.post(`${API_URL}/add`, expense);
  return response.data;
};

const deleteExpense = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const editExpense = async (id, expense) => {
  const response = await axios.put(`${API_URL}/${id}`, expense);
  return response.data;
};

const getExpenses = async (queryParams) => {
  const response = await axios.get(API_URL, { params: queryParams });
  return response.data;
};

const getExpenseSummary = async (queryParams) => {
  const response = await axios.get(`${API_URL}/summary`, { params: queryParams });
  return response.data;
};

const listExpense = async (queryParams) => {
  const response = await axios.get(`${API_URL}/`, { params: queryParams });
  return response.data;
};

const ExpenseService= {
  addExpense,
  deleteExpense,
  editExpense,
  getExpenses,
  getExpenseSummary,
  listExpense
};

export default ExpenseService;
