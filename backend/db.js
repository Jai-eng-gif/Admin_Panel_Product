import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
// Connect to MongoDB
mongoose.connect(process.env.DB_URI)

const db= mongoose.connection;

db.on('connected',()=>{
    console.log('MongoDB connected');
})

db.on('error',(err)=>{
    console.log("Error connecting to MongoDB",err)
})

db.on('disconnect',(err)=>{
    console.log("MongoDB disconnected",err)
})

export default db;

