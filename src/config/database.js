import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kausraj726:kaushalraj@kaushal.1ovwx.mongodb.net/devTinder?retryWrites=true&w=majority"
  );
};

export default connectDB;
