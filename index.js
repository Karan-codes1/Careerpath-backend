import express from 'express'
import dotenv from 'dotenv';
import { connectDB } from './models/db.js';
dotenv.config();


const app = express()
const port = process.env.PORT || 8080

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/',(req,res)=>{
    res.send("Hello world");
})

app.get('/ping',(req,res)=>{
    res.send("Pong");
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
