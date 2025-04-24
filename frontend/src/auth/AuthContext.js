// import React, { useState, useEffect, createContext } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [accessToken, setAccessToken] = useState("")
//   const navigate=useNavigate()
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("Part 2", token)
//     if (token) {
//       setIsAuthenticated(true)
//       setAccessToken(token)
//     }
//     else {
//       navigate('/login')
//       setAccessToken("")
//     }
//   }, []);

//   const login = (cb) => {
//     setIsAuthenticated(true);
//     cb();
//   };

//   const logout = (cb) => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//     cb();
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, accessToken}}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    
    if (token && refreshToken) {
      // Assume token is valid if it exists (since we can't verify)
      setIsAuthenticated(true);
      setAccessToken(token);
    } else {
      logout(() => navigate('/login'));
    }
  }, []);

  const refreshAuthToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return null;

    try {
      const response = await fetch('http://localhost:8000/api/account/auth/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken })
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access);
        setAccessToken(data.access);
        return data.access;
      }
      return null;
    } catch {
      return null;
    }
  };

  const login = (cb, tokens) => {
    localStorage.setItem("token", tokens.access);
    localStorage.setItem("refreshToken", tokens.refresh);
    setIsAuthenticated(true);
    setAccessToken(tokens.access);
    cb();
  };

  const logout = (cb) => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setAccessToken("");
    cb();
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      accessToken,
      refreshAuthToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
}