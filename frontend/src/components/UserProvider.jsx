/* eslint-disable */
import UserContext from './UserContext.jsx';

const isAuthorized = () => {
  return window.localStorage.token ? true : false;
};

const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value={{isAuthorized}}>
        {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
