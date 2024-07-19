const express = require('express');
const connectDB = require('./config/db');
const cors=require('cors');

require('dotenv').config();


const app=express();

//connect Database
connectDB();

// Middleware
const allowedOrigins = ['http://localhost:3000', 'https://expense-tracker-skm7.onrender.com/'];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
}));
app.use(express.json(express.json({ extended: false })))

//Define routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));