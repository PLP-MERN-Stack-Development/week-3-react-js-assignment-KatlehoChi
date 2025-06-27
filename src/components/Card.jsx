import React from 'react';

const Card = ({ title, body }) => {
  return (
    <div className="border border-gray-300 dark:border-gray-700 p-4 rounded shadow-sm bg-white dark:bg-gray-800">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">{body}</p>
    </div>
  );
};

export default Card;

