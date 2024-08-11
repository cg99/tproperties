import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log('Using existing database connection');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI!);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};


export default connectToDatabase;
