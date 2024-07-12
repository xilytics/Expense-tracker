const express = require ('express');
const router=express.Router();
const { register } = require('../controllers/authController');
const { signin } = require('../controllers/authController');

//Register user
router.post('/register',register);
router.post('/signin',signin);


module.exports=router;