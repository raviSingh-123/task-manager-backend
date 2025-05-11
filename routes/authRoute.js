import express from 'express';
import mongoose from "mongoose";
import { loginController, registerController } from '../controllers/authController.js';



const router = express.Router();

//routing

//register
router.post('/register',registerController);

//login
router.post('/login',loginController);

export default router;