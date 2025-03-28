import express from 'express';
import Book from '../models/bookModel.js';

const router = express.Router();


router.post('/book', async (req, res) => {
  try {
    const { title, image, rate, caption, userId } = req.body

    const book = (Book.create({ title, image, rate, caption, user: userId })).populate('user')
    console.log('book', book)
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
})



export default router;