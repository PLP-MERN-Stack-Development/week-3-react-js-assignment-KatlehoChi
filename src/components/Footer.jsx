import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} PLP Task Manager. Built by Katleho.
      </div>
    </footer>
  );
};

export default Footer;

