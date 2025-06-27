import { useEffect, useState } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tasks');
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((task) => ({
          id: task._id,
          text: task.title,
          completed: false, // You can extend this if your schema supports it
        }));
        setTasks(formatted);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { tasks, loading, error };
};

export default useTasks;

