import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory task store
let tasks = [];

// POST /api/tasks – Create a new task
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

// GET /api/tasks – Retrieve all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

