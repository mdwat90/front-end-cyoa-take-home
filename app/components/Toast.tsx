"use client";

import React, { ReactElement } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const Toast = ({ message, visible, onClose }: ToastProps): ReactElement | null => {
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-700 text-white px-4 py-2 rounded shadow-lg">
      <div className="flex items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;