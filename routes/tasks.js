import express from 'express'; 
const routes = express.Router();
import { getAllTasks ,getSingleTasks ,createTasks ,updateTasks ,deleteTasks } from '../controller/tasksController.js';

routes.route('/').get(getAllTasks).post(createTasks);
routes.route('/:id').get(getSingleTasks).put(updateTasks).delete(deleteTasks);

export default routes;
