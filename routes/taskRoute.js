import express from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController.js';


const router = express.Router();

//routing
router.post('/createtask', createTask);
router.get('/gettasks', getTasks);
router.put('/updatetask/:id', updateTask);
router.delete('/deletetask/:id', deleteTask);

export default router;