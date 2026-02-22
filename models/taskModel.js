import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name : {
    type : String , 
    required : true,
    trim : true,
    maxlength : 20
  },
  complated : {
    type : Boolean , 
    default : false
  }
});

const TaskModel = mongoose.model("Tasks",TaskSchema);

export default TaskModel;