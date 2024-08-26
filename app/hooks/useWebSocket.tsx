// components/CommentsList.tsx
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserProvider';
import { useMessagesContext } from '../context/MessagesProvider';
import { Message } from '../types';
import { Api } from '../../api';

const useWebSocket = () => {
  const { messages, setMessages } = useMessagesContext();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { userName, showToast } = useUserContext();

  useEffect(() => {
    Api.get('http://localhost:3001/getComments').then(async (data) => {
      const sortedData = data.sort((a: Message, b: Message) => {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      });
      setMessages(sortedData);
    });
  }, []);

  useEffect(() => {
    // Establish WebSocket connection
    const socket = new WebSocket('ws://localhost:3001');
    setWs(socket);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (!Array.isArray(data)) {
        // New comment received
        const newMessage: Message = data;
        setMessages((prevMessages) => [newMessage, ...prevMessages as Message[]]);
        
        // Check if the new comment is from a different user
        if (data.name !== userName) {
          showToast(`New message from ${data.name}`);
        }
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, [userName]);

  const sendMessage = (message: Message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  };

  return {
    sendMessage,
    messages
  }
};

export default useWebSocket;