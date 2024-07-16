const express = require ('express');
const router=express.Router();
const { register } = require('../controllers/authController');
const { signin } = require('../controllers/authController');

//Register user
router.post('/register',register);
//Signin user
router.post('/signin',signin);


module.exports=router;