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
import AIRouter from './routes/AIRouter.js'
import QuizRouter from './routes/QuizRouter.js'

import { connectDB } from './models/db.js';

if (process.env.NODE_ENV !== "production") {
    dotenv.config(); // only load .env locally
}

const app = express()
const port = process.env.PORT || 8080 

// Middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "https://careerpath-frontend-ahhqb224f-karan-s-projects-b00c492a.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, mobile apps, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


// Connect to MongoDB
await connectDB();


//Routers

app.use('/auth',AuthRouter)
app.use('/roadmap',RoadmapRouter);
app.use('/milestone',MilestoneRouter)
app.use('/resource',ResourceRouter)
app.use('/bookmarks',BookmarkRouter)
app.use('/profile',ProfileRouter)
app.use('/dashboard',DashboardRouter)
app.use('/ai',AIRouter)
app.use('/quiz',QuizRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
