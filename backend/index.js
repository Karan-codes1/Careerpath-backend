import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRouter from './routes/authRouter.js'
import RoadmapRouter from './routes/RoadmapRouter.js'

import { connectDB } from './models/db.js';

dotenv.config();


const app = express()
const port = process.env.PORT || 8080

// Middleware
app.use(express.json());
app.use(cors())

// Connect to MongoDB
await connectDB();

//Routers
app.use('/auth',AuthRouter)
app.use('/roadmaps',RoadmapRouter);

app.get('/',(req,res)=>{
    res.send("Hello world");
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
