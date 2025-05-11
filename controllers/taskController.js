import Task from '../models/taskModel.js'

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ title, description, userId: req.user._id });
        await task.save();
        res.status(201).send({
            success: true,
            message: 'Task is created successfully',
            task,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong in task creation',
            error,
        });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        res.status(201).send({
            success: true,
            message: tasks,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
};

export const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        res.status(201).send({
            success: true,
            message: 'Task is updated successfully',
            updatedTask,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Something went wrong in update',
            error
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        res.status(201).send({
            success: true,
            message: 'Task deleted'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Something went wrong in deletion',
            error
        });
    }
};
