"use client"
 
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message } from '../types';
import { Api } from '@/api';

interface MessagesContextType {
  messages: Message[];
  deleteMessages: () => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const useMessagesContext = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessageContext must be used within a MessagesProvider');
  }
  return context;
};

interface MessagesProviderProps {
  children: ReactNode;
}

export const MessagesProvider: React.FC<MessagesProviderProps> = ({ children }) => {
  const [ messages, setMessages ] = useState<Message[]>([]);

  const deleteMessages = () => {
    Api.delete('http://localhost:3001/deleteComments').then(() => {
      setMessages([]);
    });
  }

  return (
    <MessagesContext.Provider value={{ messages, deleteMessages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};