"use client"
 
import React, { createContext, useContext, useState, ReactNode, ReactElement } from 'react';
import { Message } from '../types';
import { Api } from '@/app/api';

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

export const MessagesProvider = ({ children }: MessagesProviderProps): ReactElement => {
  const [ messages, setMessages ] = useState<Message[]>([]);

  const deleteMessages = async () => {
    try {
      const data = await Api.delete('http://localhost:3001/deleteComments');
      if(data.id) {
        setMessages([]);
      }
    } catch (error) {
      console.error('Delete comments error:', error);
    }
  }

  return (
    <MessagesContext.Provider value={{ messages, deleteMessages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};