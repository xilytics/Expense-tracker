import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import NavBar from './components/NavBar';
import SignUp from './components/signup/SignUp.js';
import SignIn from './components/signin/SignIn.js';
import ExpenseList from './Main/ExpenseList.js';





function App(){
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<SignUp />} /> 
          <Route path="/" element={<SignIn />} />
          <Route path="/ExpenseList" element={<ExpenseList />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
