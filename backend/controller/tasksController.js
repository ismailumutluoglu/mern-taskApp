import TaskModel from "../models/taskModel.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

export const getAllTasks = asyncWrapper(async (req, res,next) => {
    const tasks = await TaskModel.find({});
    res.status(200).send({ tasks });
});

export const createTasks = asyncWrapper(async (req, res,next) => {
    const task = await TaskModel.create(req.body);
    res.status(201).json({ task });
});

export const getSingleTasks = asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
    const task = await TaskModel.findById(id);

    if (!task) {
        return res.status(404).json({ msg: `No Task with id ${id}` });
    }

    res.status(200).json({ task });
});

export const updateTasks = asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
    const updatedData = req.body;

    const task = await TaskModel.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    });

    if (!task) {
        return res.status(404).json({ msg: `Böyle bir görev bulunamadi (ID: ${id})` });
    }

    res.status(200).json({ task });
});

export const deleteTask = asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
    const task = await TaskModel.findByIdAndDelete(id);

    if (!task) {
        return res.status(404).json({ msg: `No Task with id ${id}` });
    }
    
    res.status(200).json({ msg: "Task deleted successfully", task });
});