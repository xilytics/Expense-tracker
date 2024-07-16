const mongoose = require('mongoose');

const ExpenseSchema= new mongoose.Schema({
    date: { type: Date, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
  }

);

module.exports=mongoose.model('Expense', ExpenseSchema);

