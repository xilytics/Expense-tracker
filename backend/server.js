const express = require('express');
const connectDB = require('./config/db');
const cors=require('cors');
require('dotenv').config();


const app=express();

//connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json(express.json({ extended: false })))

//Define
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));