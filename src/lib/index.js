import mongoose from 'mongoose'; 
export const connectDB = async () => {
   try {
    const cnn = await mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected to MongoDB")); 
    console.log('MongoDB connected to:', cnn.connection.host);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

 