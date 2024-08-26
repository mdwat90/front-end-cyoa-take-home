// pages/page.tsx
import React from 'react';
import Home from './pages/Home';
import { UserProvider } from './context/UserProvider';
import { MessagesProvider } from './context/MessagesProvider';

const Page: React.FC = () => {
  return (
    <UserProvider>
      <MessagesProvider>
        <Home />
      </MessagesProvider>
    </UserProvider>
  );
};

export default Page;