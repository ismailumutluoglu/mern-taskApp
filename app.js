import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); //bu satır önemli .env içeriğini aktarmak için !!! 
import cors from 'cors';
import routes from './routes/tasks.js'
import connectDB from './db/connectDB.js';

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.static('./public'));
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