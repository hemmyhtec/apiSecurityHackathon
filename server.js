import dotenv from 'dotenv'
dotenv.config()

import express from "express";  
import morgan from "morgan";
import cors from "cors"
import passport from 'passport';
import logger from './log/logger.js';
import connectDB from './config/database.js';
import helmet from "helmet"
import authRoutes from "./app/routes/authRoute.js"
import userRoutes from "./app/routes/userRoute.js"


const app = express()
connectDB()

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())

let PORT = process.env.PORT


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// Routes
app.use('/auth', authRoutes);
// app.use('/user', userRoutes);


// Start the server
app.listen(PORT, () =>
  logger.info(`APP Started on Port --- ${PORT}`)
);





