"use client";

import React, { ReactElement } from 'react';
import CommentForm from './components/CommentForm';
import CommentsList from './components/CommentsList';
import Toast from './components/Toast';
import { useUserContext } from './context/UserProvider';
import { useMessagesContext } from './context/MessagesProvider';

const Home = (): ReactElement => {
const { toastMessage, toastVisible, hideToast } = useUserContext();
const { messages, deleteMessages } = useMessagesContext();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="w-full max-w-2xl flex-none mt-10">
            <CommentForm />
        </div>
        <div className="w-full max-w-2xl mt-10 flex-grow">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-left">Comments</h2>
              <button
                onClick={deleteMessages}
                data-testid="delete-all-button"
                className={`${
                  messages && messages.length > 0 ? 'text-red-500 hover:text-red-700' : 'text-gray-500 cursor-not-allowed'
                }`}
                disabled={messages && messages.length <= 0}
              >
                Delete All
              </button>
            </div>
            <div className="overflow-y-auto bg-gray-800 p-4 rounded" style={{ maxHeight: '40vh' }}>
                <CommentsList />
            </div>
        </div>
        <Toast message={toastMessage} visible={toastVisible} onClose={hideToast} />
    </div>
  );
};

export default Home;