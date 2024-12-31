import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem('user');
  const storedEmail = localStorage.getItem('email');
  const storedToken = localStorage.getItem('token');
  const storedIsLogged = JSON.parse(localStorage.getItem('isLogged'));

  const [user, setUser] = useState(storedUser || null);
  const [email, setEmail] = useState(storedEmail || null);
  const [isLogged, setIsLogged] = useState(storedIsLogged || false);
  const [token, setToken] = useState(storedToken || null);

  const login = (user, email, token) => {
    setUser(user);
    setEmail(email);
    setToken(token);
    setIsLogged(true);

    localStorage.setItem('user', user);
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    localStorage.setItem('isLogged', true);
  };

  const logout = () => {
    setUser(null);
    setEmail(null);
    setToken(null);
    setIsLogged(false);

    localStorage.removeItem('user');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.setItem('isLogged', false);
  };

  useEffect(() => {
    if (isLogged) {
      localStorage.setItem('user', user);
      localStorage.setItem('email', email);
      localStorage.setItem('token', token);
      localStorage.setItem('isLogged', true);
    }
  }, [user, email, token, isLogged]);

  return (
    <AuthContext.Provider value={{ user, email, isLogged, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
