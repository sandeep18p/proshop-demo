import mongoose from 'mongoose';
import dotenv from 'dotenv'
const connectDB = async ()=>{
    console.log("one db")
try{
    console.log("kaam chal ra h")
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log("kaam chal ra h")
}catch(error){
   console.log(`Error : ${error.message}`);
   process.exit(1);
}
};
export default connectDB;