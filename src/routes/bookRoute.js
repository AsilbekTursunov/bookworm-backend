import express from 'express';
import Book from '../models/bookModel.js';
import User from '../models/userModel.js';
import { deleteImage, getImageNameFromUrl, saveImage } from '../lib/fileSave.js';

const router = express.Router();

router.post('/create-book', async (req, res) => {
  try {
    const { title, image, rate, caption, userId } = req.body

    const user = await User.findOne({ id: userId })

    const savedImage = await saveImage(image)
    const book = await Book.create({ title, image: savedImage, rate, caption, user: user._id })


    const response = {
      title: book.title,
      caption: book.caption,
      image: book.image,
      rate: book.rate,
      userId: user._id,
      username: user.username,
      createdAt: book.createdAt,
      id: book._id
    }
    return res.json({ data: response })
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
})

router.get('/all', async (req, res) => {
  try {
    const page = req.query.page || 1
    const limit = req.query.limit || 4
    const skip = (page - 1) * limit
    const books = await Book.find().populate('user', 'username image').skip(skip).limit(limit)
    res.json({ data: books })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
})

router.post('/delete/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
    const imageName = getImageNameFromUrl(book.image)
    await deleteImage(imageName)
    if (!book) return res.status(404).json({ error: 'Book not found' })
    res.json({ data: book })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
})



export default router;