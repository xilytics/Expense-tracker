//Sign up with email & password
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema= new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

module.exports = mongoose.model('User', UserSchema);

//Encrypting password before saving the user

UserSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });