import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

// Registration route
export const register = async (req, res) => {
    const { name, email, password, username, role } = req.body;
  
    try {
      // Check if the email or username already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email or username already in use' });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        username,
        role: role || 'customer', 

      });
  
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user);
  res.json({ user, token });
};

export const getUserProfile = async (req, res) => {
    res.json(req.user);
};
