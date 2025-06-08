import React from 'react';

const ErrorAlert = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <p className="text-red-700">{message}</p>
        <button 
          onClick={onDismiss}
          className="text-red-500 hover:text-red-700"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;