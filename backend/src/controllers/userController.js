
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'NITTRICHY')
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'NITTRICHY')
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials'  });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};