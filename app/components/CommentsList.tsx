"use client"

import React from 'react';
import { formatDate } from '../utils';
import { useUserContext } from '../context/UserProvider';
import { useMessagesContext } from '../context/MessagesProvider';

const CommentsList: React.FC = () => {
const { messages } = useMessagesContext();
const { userName } = useUserContext();

  return (
    <div className="w-full max-w-2xl mt-8">
      {messages && messages.length > 0 ? (
        messages.map(({message, name, created}, index) => (
          <div key={index} className="mb-4 p-4 border rounded shadow-sm">
            <p>{message}</p>
            <p className="text-sm text-gray-500">
              {name === userName ? 'Me' : name} on {formatDate(created)}
            </p>
          </div>
        ))
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
};

export default CommentsList;