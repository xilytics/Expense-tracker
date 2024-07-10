//Handling user registration
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register=async(req,res)=>{
    try {
      const { email, password } = req.body;
  
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      user = new User({
        email,
        password,
      });

      await user.save();

      //Create JWT
      const payload={
        user: {
            id: user.id,
          },
        };

        jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            });
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
        }
};


