"use client";

import { FormEvent } from 'react';
import useWebSocket from '../hooks/useWebSocket';
import { useUserContext } from '../context/UserProvider';

export default function CommentForm() {
const { userName, setUserName, message, setMessage } = useUserContext();
  const { sendMessage } = useWebSocket();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ name: userName, message, created: new Date() });
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-gray-800 shadow-md rounded">
      <div className="mb-4">
        <label htmlFor="userName" className="block text-gray-300 text-sm font-bold mb-2">
          Name
        </label>
        <input
          id="userName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-gray-300 text-sm font-bold mb-2">
          Comment
        </label>
        <textarea
          id="comment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
}