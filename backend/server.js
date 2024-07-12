const express = require('express');
const connectDB = require('./config/db');
const mongoose=require('mongoose');
const cors=require('cors');
const expenseRoutes=require('./routes/expenseRoutes');
require('dotenv').config();


const app=express();

//connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json(express.json({ extended: false })))

//Define routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/expenses', expenseRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));