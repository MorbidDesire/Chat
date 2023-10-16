/* eslint-disable */
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useAuth } from "./useAuth";

const Navigation = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: false });
  }
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {token && <button type="button" className="btn btn-primary" onClick={handleLogout}>Выйти</button>}
      </div>
    </nav>
  )
  };

export default Navigation;
