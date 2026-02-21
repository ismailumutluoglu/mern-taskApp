export const getAllTasks = async(req,res) => {
    res.send("get all tasks");
}

export const getSingleTasks = async(req,res) => {
    res.json({id:req.params.id});
}

export const createTasks = async(req,res) => {
    res.json(req.body);
}

export const updateTasks = async(req,res) => {
    res.send("update tasks");
}

export const deleteTasks = async(req,res) => {
    res.send("delete tasks");
}