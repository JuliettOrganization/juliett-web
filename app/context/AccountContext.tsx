"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AccountContextProps {
  accountid: string | null;
  accountname: string | null;
  accountpic: string | null;
  setAccountInfo: (id: string, name: string, pic: string) => void;
}

const AccountContext = createContext<AccountContextProps | undefined>(
  undefined,
);

export const AccountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accountid, setAccountid] = useState<string | null>(null);
  const [accountname, setAccountname] = useState<string | null>(null);
  const [accountpic, setAccountpic] = useState<string | null>(null);

  useEffect(() => {
    const storedAccountid = localStorage.getItem("accountid");
    const storedAccountname = localStorage.getItem("accountname");
    const storedAccountpic = localStorage.getItem("accountpic");
    if (storedAccountid && storedAccountname && storedAccountpic) {
      setAccountid(storedAccountid);
      setAccountname(storedAccountname);
      setAccountpic(storedAccountpic);
    }
  }, []);

  const setAccountInfo = (id: string, name: string, pic: string) => {
    setAccountid(id);
    setAccountname(name);
    setAccountpic(pic);
    localStorage.setItem("accountid", id);
    localStorage.setItem("accountname", name);
    localStorage.setItem("accountpic", pic);
  };

  return (
    <AccountContext.Provider
      value={{ accountid, accountname, accountpic, setAccountInfo }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = (): AccountContextProps => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};
