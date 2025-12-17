import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo connected in ${conn.connection.host}`.cyan.underline.bold)
    } catch (err) {
        console.log(`Error: ${err.message}`.red);
         // ❌ DO NOT exit in production
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
    }
}