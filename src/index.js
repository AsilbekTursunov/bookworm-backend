import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// routes
import authRoute from './routes/authRoute.js';
import bookRoute from './routes/bookRoute.js';

const app = express();
dotenv.config();

 

app.use(express.json());
app.use(cookieParser());
app.use(express.static("static"));
app.use(fileUpload({ createParentPath: true })); 

app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);

const PORT = 8000;

// call port
const bootstrap = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("Connected to MongoDB"));
    app.listen(PORT, () => console.log(`Connected to ${PORT}`));
  } catch (error) {
    console.log(`Error connecting:${error}`);
  }
};

bootstrap();
