"use client"
 
import React, { createContext, useContext, useState, ReactNode, useEffect, ReactElement } from 'react';

interface UserContextType {
  disabledSubmit: boolean;
  userName: string;
  message: string;
  toastMessage: string;
  toastVisible: boolean;
  setDisabledSubmit: (disabled: boolean) => void;
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

export const UserProvider = ({ children }: UserProviderProps): ReactElement => {
  const [userName, setUserName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible ] = useState<boolean>(false);
  const [ disabledSubmit, setDisabledSubmit ] = useState<boolean>(true);

  useEffect(() => {
    if(userName && message) {
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
    }
  }, [userName, message]);

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
    <UserContext.Provider value={{ disabledSubmit, setDisabledSubmit, userName, message, setUserName, setMessage, toastMessage, toastVisible, showToast, hideToast }}>
      {children}
    </UserContext.Provider>
  );
};