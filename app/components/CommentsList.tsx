"use client"

import React, { ReactElement } from 'react';
import { formatDate } from '../utils';
import { useUserContext } from '../context/UserProvider';
import { useMessagesContext } from '../context/MessagesProvider';

const CommentsList = (): ReactElement => {
const { messages } = useMessagesContext();
const { userName } = useUserContext();

  return (
    <div className="w-full max-w-2xl" data-testid="comments-list">
      {messages && messages.length > 0 ? (
        messages.map(({message, name, created}, index) => (
          <div key={index} className={`mt-4 mb-4 p-4 rounded shadow-sm ${name === userName ? 'bg-blue-900' : 'bg-gray-900'}`} data-testid='comment'>
            <p>{message}</p>
            <p className="text-sm text-gray-500">
              {name === userName ? 'Me' : name} on {formatDate(created)}
            </p>
          </div>
        ))
      ) : (
        <p className="m-2">No comments yet 👀</p>
      )}
    </div>
  );
};

export default CommentsList;