import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Task from './models/Task.js';


mongoose.connect('mongodb://localhost:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory task storage
let tasks = [];

// Create a new task
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: Date.now().toString(),
    title,
    description: description || '',
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// POST /api/tasks
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

import Task from './models/Task.js'; // Make sure this is already at the top

// DELETE /api/tasks/:id – Delete a task by ID
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

