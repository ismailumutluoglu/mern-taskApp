import TaskModel from "../models/taskModel.js";

export const getAllTasks = async(req,res) => {
    res.send("get all tasks");
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
    res.json({id:req.params.id});
}

export const updateTasks = async(req,res) => {
    res.send("update tasks");
}

export const deleteTasks = async(req,res) => {
    res.send("delete tasks");
}