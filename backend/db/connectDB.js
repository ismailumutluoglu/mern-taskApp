import mongoose from "mongoose";

const connectDB = async(DATABASE_URL) => {
    await mongoose.connect(DATABASE_URL);
    console.log("Database connected");
};

export default connectDB;