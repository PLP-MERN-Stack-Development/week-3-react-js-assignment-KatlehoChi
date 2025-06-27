import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">PLP Task Manager</h1>
        <button
  onClick={toggle}
  className="text-sm px-3 py-1 border border-white/30 rounded hover:bg-white/10 transition ml-4"
>
  {darkMode ? '🌙 Dark' : '☀️ Light'}
</button>


        <span className="text-sm opacity-75">Welcome, Katleho!</span>
      </div>
    </nav>
  );
};

export default Navbar;

