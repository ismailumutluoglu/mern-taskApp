import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); //bu satır önemli .env içeriğini aktarmak için !!! 
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/tasks.js'
import connectDB from './db/connectDB.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

//Routes

app.use('/api/v1/tasks',routes);


const start = async() => {
  try {
    await connectDB(process.env.DATABASE_URL);
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
    console.log(`http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
}
start();