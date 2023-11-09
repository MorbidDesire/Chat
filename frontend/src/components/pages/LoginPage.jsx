import { useTranslation } from 'react-i18next';
import avatar from '../../assets/avatar.json';
import Navigation from '../Navigation';
import routes from '../../routes';
import AuthForm from '../validationForms/AuthForm';

const LoginPage = () => {
  const { t } = useTranslation('translation');
  return (
    <>
      <Navigation />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src={avatar} className="rounded-circle" alt={t('loginPage.enter')} />
                </div>
                <AuthForm t={t} />
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>
                    {t('loginPage.noAcc')}
                    {' '}
                  </span>
                  <a href={routes.signupPage}>{t('loginPage.reg')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
