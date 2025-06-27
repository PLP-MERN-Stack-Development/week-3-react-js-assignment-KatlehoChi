import React, { useState, useEffect } from 'react';
import Button from './Button';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  // Fetch tasks from backend on load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/tasks');
        const data = await res.json();

        const formatted = data.map((task) => ({
          id: task._id,
          text: task.title,
          completed: false,
          createdAt: task.createdAt,
        }));

        setTasks(formatted);
      } catch (err) {
        console.error('Failed to fetch tasks:', err.message);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (text) => {
    if (!text.trim()) return;

    const newTask = {
      title: text,
      description: '',
    };

    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      const savedTask = await res.json();
      setTasks([
        ...tasks,
        {
          id: savedTask._id,
          text: savedTask.title,
          completed: false,
          createdAt: savedTask.createdAt,
        },
      ]);
    } catch (err) {
      console.error('Failed to save task to backend:', err.message);
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

 const deleteTask = async (id) => {
  try {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
    });

    setTasks(tasks.filter((task) => task.id !== id));
  } catch (err) {
    console.error('Failed to delete task:', err.message);
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTaskText);
    setNewTaskText('');
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Task Manager</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <Button type="submit" variant="primary">
            Add Task
          </Button>
        </div>
      </form>

      <div className="flex gap-2 mb-4">
        {['all', 'active', 'completed'].map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <li className="text-gray-500 dark:text-gray-400 text-center py-4">
            No tasks found
          </li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className={task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}>
                  {task.text}
                </span>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
              >
                Delete
              </Button>
            </li>
          ))
        )}
      </ul>

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>{tasks.filter((task) => !task.completed).length} tasks remaining</p>
      </div>
    </div>
  );
};

export default TaskManager;

