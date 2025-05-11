import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js'
import taskRoute from './routes/taskRoute.js'
import { requireSignIn } from './middlewares/authMiddleware.js';
import cors from 'cors';
//config env file
dotenv.config();

//database config
connectDB();


const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/task',requireSignIn,taskRoute);

const PORT = process.env.PORT || 8000;

app.get('/',(req,res)=>{
    res.send("Server start ho gya h");
})

app.listen(PORT,()=>{
    console.log(`Server start on port no. ${PORT}`);
})