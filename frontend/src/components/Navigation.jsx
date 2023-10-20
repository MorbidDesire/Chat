import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from './useAuth';

const Navigation = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const { t } = useTranslation('translation');

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: false });
  };
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {token && <button type="button" className="btn btn-primary" onClick={handleLogout}>{t('navigation.logout')}</button>}
      </div>
    </nav>
  );
};

export default Navigation;
