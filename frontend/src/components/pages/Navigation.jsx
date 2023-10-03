import React, { useContext } from 'react';
import UserContext from '../UserContext';

const Navigation = () => {
  const user = useContext(UserContext);
  console.log(user);
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
      </div>
    </nav>
  )};

export default Navigation;
