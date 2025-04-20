import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate=useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {setIsAuthenticated(true)}
    else {navigate('/login')}
  }, []);

  const login = (cb) => {
    setIsAuthenticated(true);
    cb();
  };

  const logout = (cb) => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    cb();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
