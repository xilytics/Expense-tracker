//Handling user registration
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');

exports.register=async(req,res)=>{
    try {
      const { email, password } = req.body;
  
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
  
      user = new User({
        email,
        password: hashedPassword,
      });

      const savedUser=await user.save();

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

        res.status(201).json({ userId: savedUser._id, token });
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
        }
};


exports.signin=async(req,res)=>{
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: 'Invalid email or password' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ message: 'Invalid email or password' });

    // Generate token
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response
      res.send({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }

};


 
