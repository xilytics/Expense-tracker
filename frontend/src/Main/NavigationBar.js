// src/components/NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // Ensure to create this CSS file for styling

const NavigationBar = () => {
    return (
        <div className="navbar">
            <div className="navbar-left">Expense Tracker</div>
            <div className="navbar-right">
                <Link to="/overview">Overview</Link>
            </div>
        </div>
    );
};

export default NavigationBar;
