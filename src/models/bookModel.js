import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: { type: String, required: true }, 
  caption: { type: String, required: true },
  image: { type: String, required: true },
  rate: { type: String, required: true, min: 1, max: 5 },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Book = model('Book', bookSchema);

export default Book;  