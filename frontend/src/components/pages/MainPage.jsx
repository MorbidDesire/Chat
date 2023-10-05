/* eslint-disable */
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from "../useAuth";
import { useTranslation } from 'react-i18next';
import Navigation from './Navigation';

const MainPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  console.log(token);
  // useEffect(() => {
  //   setToken(window.localStorage.user);
  // }, []);
  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: false })
    }
  }, []);
  if (token) {
    return (
      <Navigation />
    );
  };
};

export default MainPage;
