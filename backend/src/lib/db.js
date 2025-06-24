import mongoose from "mongoose"

export const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("database conneted : ", conn.connection.host);
    } catch (error) {
        console.log("mongodb connection error : ", error);
    }
}