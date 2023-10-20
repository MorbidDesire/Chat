import { useState } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUser] = useState(localStorage.getItem('username'));
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
    setToken(null);
  };
  const login = () => {
    setToken(localStorage.getItem('token'));
    setUser(localStorage.getItem('username'));
  };

  return {
    token,
    username,
    logout,
    login,
  };
};
