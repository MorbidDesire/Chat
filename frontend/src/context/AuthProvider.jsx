import { AuthContext } from './index';
import useAuth from '../useAuth';

const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;
