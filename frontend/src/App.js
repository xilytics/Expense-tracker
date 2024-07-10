import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';

function App(){
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/" element={
            <div>
              <h1>Welcome to the Expense Tracker App</h1>
              <p>Please sign up or login to continue.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
