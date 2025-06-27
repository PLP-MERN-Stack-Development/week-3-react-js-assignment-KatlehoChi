
import { useState } from 'react';
import './App.css';
import './index.css';
import TaskManager from './components/TaskManager';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import usePosts from './hooks/usePosts';
import Card from './components/Card';
import useDarkMode from './hooks/useDarkMode';


function App() {
  const [count, setCount] = useState(0);
  const { posts, loading, error } = usePosts();
  const { darkMode, toggle } = useDarkMode();


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow mb-6 rounded-lg">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold">PLP Task Manager</h1>
          </div>
        </header>

        {/* Task Manager + Counter */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6 mb-8">
          <div className="flex flex-col items-center justify-center">
            <TaskManager />

            <p className="text-lg mb-4">
              Edit <code className="font-mono bg-gray-200 dark:bg-gray-700 p-1 rounded">src/App.jsx</code> and save to test HMR
            </p>

            <div className="flex items-center gap-4 my-4">
              <button
                onClick={() => setCount((count) => count - 1)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                -
              </button>
              <span className="text-xl font-bold">{count}</span>
              <button
                onClick={() => setCount((count) => count + 1)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                +
              </button>
            </div>

            <p className="text-gray-500 dark:text-gray-400 mt-4">
              Implement your TaskManager component here
            </p>
          </div>
        </div>

        {/* API Data Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">API Data</h2>

          {loading && <p>Loading posts...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="border border-gray-300 dark:border-gray-700 p-4 rounded shadow-sm">
                <h3 className="font-bold text-lg">{post.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

