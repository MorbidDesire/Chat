/* eslint-disable */
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from "@reactivers/use-auth";
import { useTranslation } from 'react-i18next';
import Navigation from './Navigation';

const MainPage = () => {
  const navigate = useNavigate();
  let { token } = useAuth();
  token = window.localStorage.user;
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
