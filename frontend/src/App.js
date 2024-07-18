import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import NavBar from './components/NavBar';
import SignUp from './components/signup/SignUp.js';
import SignIn from './components/signin/SignIn.js';
import ExpenseList from './Main/ExpenseList.js';
import AddExpensePage from './components/AddExpenses/AddExpense.js';





function App(){
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/" element={<SignIn />} />
          <Route path="/overview" element={<ExpenseList />} />
          <Route path="/add" element={<AddExpensePage />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
