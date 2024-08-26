"use client"
 
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  userName: string;
  message: string;
  toastMessage: string;
  toastVisible: boolean;
  setUserName: (name: string) => void;
  setMessage: (comment: string) => void;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userName, setUserName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible ] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);

    setTimeout(() => {
        setToastVisible(false);
    }, 5000);
  };

  const hideToast = () => {    
    setToastVisible(false);
  };

  return (
    <UserContext.Provider value={{ userName, message, setUserName, setMessage, toastMessage, toastVisible, showToast, hideToast }}>
      {children}
    </UserContext.Provider>
  );
};