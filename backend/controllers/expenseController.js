//Handling expenses
const Expense = require('../models/Expense');
const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');

exports.addExpense=async(req,res)=> {
    try {
        const { date, amount, category, userId } = req.body;
        console.log('Request Body:', req.body);
        if (!date || !amount || !category || !userId) {
            return res.status(400).send({ message: 'Missing required fields' });
          }

        // Ensure userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ message: 'Invalid userId format' });
        }
        const expense = new Expense({
            date,
            amount,
            category,
            userId,
          });
        console.log('Expense Object:', expense);
        await expense.save();//Note: This line attempts to save the newly created expense object to the MongoDB database. Since expense.save() returns a Promise, using await here means the function will wait for the save operation to complete before proceeding to the next line.
        res.status(201).send(expense);
    }catch (err){
        console.error('Error:', err);
        res.status(400).send({ message: 'Error saving expense', error: err });
      }
};


exports.deleteExpense=async (req,res)=> {
    try {
      const expense = await Expense.findByIdAndDelete(req.params.id);
      if (!expense) {
        return res.status(404).send({ message: 'Expense not found' });
      }
      res.send({message: 'Expense deleted successfully',expense});
    } catch (err) {
      res.status(500).send({message: 'Error deleting expense',err});
    }
  };


exports.editExpense=async(req,res)=> {
    try {
      const expense = await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!expense) {
        return res.status(404).send();
      }
      res.send(expense);
    } catch (err) {
      res.status(400).send(err);
    }
  };

exports.filterExpense=async(req, res)=>{
    try {
      const { startDate, endDate, categories, userId } = req.query;
      const filter = { userId };
    // date range filter
      if (startDate && endDate) {
        filter.date = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }

    //category filter
     if (categories){
        filter.categories = {
          $in: categories.split(','),
        };
      }
    
    //Fetch expenses based on filters
    const expenses=await Expense.find(filter);
    res.send(expenses);
    } catch (err) {
        res.status(500).send(err);
    }
};


exports.getSummary= async (req, res) => {
    try {
      const { date, category, userId } = req.query;
      const match = { userId };
  
      if (date) {
        match.date = date;
      }
      if (category) {
        match.category = category;
      }
  
      const total = await Expense.aggregate([
        { $match: match },
        { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
      ]);
  
      res.send({ total: total[0] ? total[0].totalAmount : 0 });
    } catch (err) {
      res.status(500).send(err);
    }
  };


