const express = require ('express');
const router=express.Router();
const { addExpense } = require('../controllers/expenseController');
const { deleteExpense } = require('../controllers/expenseController');
const { editExpense } = require('../controllers/expenseController');
const { filterExpense } = require('../controllers/expenseController');
const { getSummary } = require('../controllers/expenseController');


//API endpoint for adding a new expense instance in mongodb in the model of Expense with data from req.body
router.post('/add', addExpense);

//Delete an expense
router.delete('/:id', deleteExpense);


//Get summary of expenses by date and category
router.get('/summary', getSummary);

//Edit expenses
router.put('/add', addExpense);

//filter expenses
router.get('/add', filterExpense);

module.exports=router;





