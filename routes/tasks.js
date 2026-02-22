import express from 'express'; 
const routes = express.Router();
import { getAllTasks ,getSingleTasks ,createTasks ,updateTasks ,deleteTask } from '../controller/tasksController.js';

routes.route('/').get(getAllTasks).post(createTasks);
routes.route('/:id').get(getSingleTasks).patch(updateTasks).delete(deleteTask);

export default routes;
