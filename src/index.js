import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// routes
import authRoute from './routes/authRoute.js';
import bookRoute from './routes/bookRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const app = express();
dotenv.config();

app.use(cors({
  credentials: true, // allow cookies
}))

 
// JSON body limitni oshirish
app.use(bodyParser.json({ limit: '50mb' })); // JSON so'rovlar uchun 50MB
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // URL encoded ma'lumotlar uchun

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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
