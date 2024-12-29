import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);

  const login = (user, email, token) => {
    setUser(user);
    setEmail(email);
    setToken(token);
    setIsLogged(true);
  }

  const logout = () => {
    setUser(null);
    setEmail(null);
    setToken(null);
    setIsLogged(false);
  }

  return (
    <AuthContext.Provider value={{ user, email, isLogged, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}