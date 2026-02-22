import TaskModel from "../models/taskModel.js";

export const getAllTasks = async(req,res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).send({tasks});
    } catch (error) {
        res.status(500).json({msg : error});
    }
}

export const createTasks = async(req,res) => {
    try {
        const task = await TaskModel.create(req.body);
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({msg : error});
    } 
}

export const getSingleTasks = async(req,res) => {
    try {
        const { id } = req.params ; 
        const task = await TaskModel.findById(id);

        if(!task)
        {
            return res.status(404).json({msg : `No Task with id ${id}`});
        }

        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg : error});
    }
}

export const updateTasks = async(req,res) => {
    res.send("update tasks");
}

export const deleteTasks = async(req,res) => {
    res.send("delete tasks");
}