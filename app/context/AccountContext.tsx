'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccountContextProps {
  accountid: string | null;
  accountname: string | null;
  accountpic: string | null;
  setAccountInfo: (id: string, name: string, pic: string) => void;
}

const AccountContext = createContext<AccountContextProps | undefined>(undefined);

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accountid, setAccountid] = useState<string | null>(null);
  const [accountname, setAccountname] = useState<string | null>(null);
  const [accountpic, setAccountpic] = useState<string | null>(null);

  const setAccountInfo = (id: string, name: string, pic: string) => {
    setAccountid(id);
    setAccountname(name);
    setAccountpic(pic);
  };

  return (
    <AccountContext.Provider value={{ accountid, accountname, accountpic, setAccountInfo }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = (): AccountContextProps => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};