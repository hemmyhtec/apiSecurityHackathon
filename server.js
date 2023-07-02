import dotenv from 'dotenv'
dotenv.config()

import express from "express";  
import morgan from "morgan";
import cors from "cors"
import passport from 'passport';
import logger from './log/logger.js';
import connectDB from './config/database.js';
import helmet from "helmet"
import bodyParser from 'body-parser';
import treblle from '@treblle/express';
import authRoutes from "./app/routes/authRoute.js"
import userRoutes from "./app/routes/userRoute.js"
import storeRoutes from "./app/routes/storeRoute.js"
import productRoutes from "./app/routes/productRoute.js"



const app = express()
connectDB()

// Middleware
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())

// Monitoring with Treblle Middleware
app.use(
  treblle({
    apiKey: process.env.TREBLLE_API_KEY,
    projectId: process.env.TREBLLE_PROJECT_ID,
  })
)

let PORT = process.env.PORT


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/store', storeRoutes);
app.use('/product', productRoutes);


// Start the server
app.listen(PORT, () =>
  logger.info(`APP Started on Port --- ${PORT}`)
);





