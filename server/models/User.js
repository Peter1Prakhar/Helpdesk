import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure the email is unique
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true, // Ensure username is unique
  },
  role: {
    type: String,
    enum: ['admin', 'agent', 'customer'],
    default: 'customer'
  }  
});

const User = mongoose.model('User', userSchema);
export default User;
