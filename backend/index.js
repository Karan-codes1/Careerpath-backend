import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRouter from './routes/authRouter.js'
import RoadmapRouter from './routes/RoadmapRouter.js'
import MilestoneRouter from './routes/MilestoneRouter.js'
import ResourceRouter from './routes/ResourceRouter.js'
import BookmarkRouter from './routes/BookmarkRouter.js'
import ProfileRouter from './routes/ProfileRouter.js'
import DashboardRouter from './routes/DashboardRouter.js'


import { connectDB } from './models/db.js';

dotenv.config();


const app = express()
const port = process.env.PORT || 8080 

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // your frontend URL
  credentials: true               // 👈 allow cookies
}));

// Connect to MongoDB
await connectDB();

//Routers

app.use('/auth',AuthRouter)
app.use('/roadmaps',RoadmapRouter);
app.use('/milestone',MilestoneRouter)
app.use('/resource',ResourceRouter)
app.use('/bookmarks',BookmarkRouter)
app.use('/profile',ProfileRouter)
app.use('/dashboard',DashboardRouter)

app.get('/',(req,res)=>{
    res.send("Hello world");
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
