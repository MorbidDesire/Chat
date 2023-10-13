/* eslint-disable */
import { useState } from 'react';

export const useAuth = () => {
  const [token, ] = useState(localStorage.getItem('token'));
  const [userId, ] = useState(localStorage.getItem('userId'));

  return {
    token,
    userId,
  };
};
