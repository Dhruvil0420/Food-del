import mongoose from "mongoose";

const connectDb = async() => {
    await mongoose.connect(process.env.MONGODB_URL).then(console.log("DB connected"))
}

export default connectDb;