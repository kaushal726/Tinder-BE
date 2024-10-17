import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kausraj726:kaushalraj@kaushal.1ovwx.mongodb.net/?retryWrites=true&w=majority&appName=kaushal"
  );
};

export default connectDB;
