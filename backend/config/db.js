const mongoose=require('mongoose');
require('dotenv').config();


//Making sure URI will be passed as a string
const db=String(process.env.MONGO_URI);

const connectDB=async()=> {
    try {
      await mongoose.connect(db);
      console.log('MongoDB connected...');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };

  module.exports=connectDB;