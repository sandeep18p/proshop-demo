import mongoose from 'mongoose';
//vifdeo 39
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//we need to use above's matchpassword in user controller

// Encrypt password using bcrypt, yaha pre ke madad se database me save hone se pehle hame allow karta task perfomr karne ke lie 
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) { //if we are not dealing with password then it will just move on to next()
    next();
  }


  //now if we are dealing with password then it will run
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
