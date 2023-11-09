import { useTranslation } from 'react-i18next';
import avatar from '../../assets/signupavatar.jpg';
import Navigation from '../Navigation';
import SignupForm from '../validationForms/SignupForm';

const SignupPage = () => {
  const { t } = useTranslation('translation');
  return (
    <>
      <Navigation />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img src={avatar} className="rounded-circle" alt={t('signupPage.header')} />
                </div>
                <SignupForm t={t} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignupPage;
