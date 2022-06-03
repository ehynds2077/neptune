import React, { createContext, ReactNode, useState } from "react";

import { axiosAPI } from "../utils/apiUtils";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<boolean>;
  logout: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const login = async (email: string, password: string) => {
    const res = await axiosAPI.post("/login", { email, password });
    const user = res.data;
    setUser(user);
    if (res.status === 200) {
      return true;
    }
    return false;
  };

  const logout = (callback: VoidFunction) => {};

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = React.useContext(AuthContext);
  if (!auth) {
    throw new Error("Must be used inside auth provider");
  }
  return auth;
};
