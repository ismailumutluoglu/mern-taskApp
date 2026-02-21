import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/tasks.js'

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

//Routes
app.get('/', (req, res) => {
  res.send('Task Manager API sorunsuz çalışıyor...');
});

app.use('/api/v1/tasks',routes);

// app.get('/api/v1/tasks');
// app.get('/api/v1/tasks/:id');
// app.post('/api/v1/tasks');
// app.put('/api/v1/tasks/:id');
// app.delete('/api/v1/tasks/:id');


app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda ayağa kalktı.`);
  console.log(`http://localhost:${PORT}`);
});