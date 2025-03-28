import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

function generateToken(userId) {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return accessToken;
}

router.post('/register', async (req, res) => {

  try {
    const { email, password, username } = req.body; 

    const existEmail = await User.findOne({ email });
    if (existEmail) return res.status(400).json({ error: 'Email already exists' });

    const exitUsername = await User.findOne({ username });
    if (exitUsername) return res.status(400).json({ error: 'This username already taken by users' });

    // get random image from unsplash
    const profileImage = `https://api.dicebear.com/7.x/avataaars/png?seed=${username}`;

    // Hash the password 
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword, username, profileImage });
    // await user.save();

    const token = generateToken(user._id);
    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, username: user.username, image: user.profileImage, createdAt: user.createdAt },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { message: 'Internel server error' } });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) return res.status(400).json({ error: 'User unathorized' });

    const validPassword = await bcrypt.compare(password, userExist.password);
    if (!validPassword) return res.status(400).json({ error: 'Password is invalid' });

    const token = generateToken(userExist._id);
    res.json({ token, user: { id: userExist._id, email: userExist.email, username: userExist.username, image: userExist.profileImage } });
    
  } catch (error) { 
    res.status(500).json({ error: { message: 'Internel server error' } }); 
  }
})


export default router;