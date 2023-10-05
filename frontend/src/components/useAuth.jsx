/* eslint-disable */
import { useState } from 'react';

export const useAuth = () => {
  const [token, ] = useState(localStorage.getItem('token'));

  return {
    token
  };
};
