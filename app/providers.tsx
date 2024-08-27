import React, { ReactElement } from 'react';
import { UserProvider } from './context/UserProvider';
import { MessagesProvider } from './context/MessagesProvider';

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps): ReactElement => {
  return (
    <UserProvider>
      <MessagesProvider>
        {children}
      </MessagesProvider>
    </UserProvider>
  );
};

export default Providers;