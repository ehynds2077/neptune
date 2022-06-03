import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { axiosAPI } from "../utils/apiUtils";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  const getUser = async () => {
    try {
      const res = await axiosAPI.get("/user");
      const user = res.data;
      setUser(user);
    } catch (e) {
      console.log(e);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await axiosAPI.post("/login", { email, password });
    const user = res.data;
    setUser(user);
    if (res.status === 200) {
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await axiosAPI.post("/register", { name, email, password });

    if (res.status === 200) {
      await login(email, password);
      return true;
    }
    return false;
  };

  const logout = async () => {
    try {
      const res = await axiosAPI.post("/logout");
      console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      setUser(null);
    }
  };

  const value = { user, login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = React.useContext(AuthContext);
  if (!auth) {
    throw new Error("Must be used inside auth provider");
  }
  return auth;
};
