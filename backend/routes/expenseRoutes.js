const express = require ('express');
const router=express.Router();
const { addExpense, listExpenses } = require('../controllers/expenseController');
const { deleteExpense } = require('../controllers/expenseController');
const { editExpense } = require('../controllers/expenseController');
const { filterExpense } = require('../controllers/expenseController');
const { getSummary } = require('../controllers/expenseController');


//API endpoint for adding a new expense instance in mongodb in the model of Expense with data from req.body
router.get('/',authenticate,listExpenses)

router.post('/', authenticate, addExpense);

//Delete an expense
router.delete('/:id', deleteExpense);

//filter expenses
router.get('/', authenticate, filterExpense);

module.exports=router;





