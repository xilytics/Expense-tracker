const express = require ('express');
const router=express.Router();
const { addExpense, listExpenses } = require('../controllers/expenseController');
const { deleteExpense } = require('../controllers/expenseController');
const { filterExpense } = require('../controllers/expenseController');
const authenticate = require('../middleware/authMiddleware'); // Import the authenticate middleware


//API endpoint for adding a new expense instance in mongodb in the model of Expense with data from req.body
router.get('/overview',authenticate,listExpenses)

router.post('/add', authenticate, addExpense);

//Delete an expense
router.delete('/:id', authenticate,deleteExpense);

//filter expenses
router.get('/filter', authenticate, filterExpense);

module.exports=router;





