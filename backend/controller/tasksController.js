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
    try {
        const { id } = req.params ; 
        const updatedData = req.body ; 

        const task = await TaskModel.findByIdAndUpdate(
            id,
            updatedData,
            {
                new: true, // Güncellenmiş YENİ veriyi geri döndür
                runValidators: true // Modeldeki kuralları (maxlength:20, required) güncellemede de çalıştır
            }
        );

        if(!task){
            return res.status(404).json({ msg: `Böyle bir görev bulunamadi (ID: ${id})` });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params; 
        const task = await TaskModel.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ msg: `No Task with id ${id}` });
        }
        
        // Silme başarılı olduğunda net bir mesaj ve silinen veriyi dönmek iyi bir pratiktir
        res.status(200).json({ msg: "Task deleted successfully", task });
    } catch (error) {
        // Hata mesajını daha güvenli hale getirdik
        res.status(500).json({ msg: error.message });
    }
}