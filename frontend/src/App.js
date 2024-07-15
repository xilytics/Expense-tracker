import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import NavBar from './components/NavBar';
import SignUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';




function App(){
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
