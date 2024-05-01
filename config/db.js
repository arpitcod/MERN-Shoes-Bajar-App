import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to mongodb databse ${conn.connection.host}`);

  } catch (error) {
    console.log(`error in mongodb ${error}`);
  }
};


export default connectDb;