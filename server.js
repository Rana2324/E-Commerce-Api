import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

// initializing express app

const app = express();

//load env variables

dotenv.config();

//rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(limiter);

//Base route
app.get('/', (req, res) => {
  res.send('Welcome to the E-Commerce API');
});

//server port
const port = process.env.PORT || 3000;

//server connection
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
