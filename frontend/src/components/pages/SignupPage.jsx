import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import * as Yup from 'yup';
import cn from 'classnames';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../useAuth';
import avatar from '../../assets/signupavatar.jpg';
import Navigation from '../Navigation';
import routes from '../../routes';

const SignupForm = ({ t }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const fieldsetEl = useRef(null);

  const submitForm = async (values, formik) => {
    fieldsetEl.current.setAttribute('disabled', true);
    await axios.post(routes.api.signup, values)
      .then(({ data }) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        login();
        navigate(routes.mainPage, { replace: false });
      })
      .catch((error) => {
        if (error.response.status === 409) {
          formik.setErrors({ signup: '409' });
          console.log(error);
        }
      });
    fieldsetEl.current.removeAttribute('disabled');
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('validation.required'))
      .min(3, t('validation.range'))
      .max(20, t('validation.range')),
    password: Yup.string()
      .required(t('validation.required'))
      .min(6, t('validation.minCount')),
    confirmPassword: Yup.string()
      .required(t('validation.required'))
      .oneOf([Yup.ref('password'), null], t('validation.samePasswords')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      submitForm(values, formik);
    },
  });
  const { errors, touched } = formik;
  const usernameClass = cn('form-control', {
    'is-invalid': touched.username && (errors.username || errors.signup),
  });
  const passwordClass = cn('form-control', {
    'is-invalid': touched.password && (errors.password || errors.signup),
  });
  const passConfClass = cn('form-control', {
    'is-invalid': touched.confirmPassword && (errors.confirmPassword || errors.signup),
  });
  return (
    <Form onSubmit={formik.handleSubmit} className="w-50">
      <fieldset ref={fieldsetEl}>
        <h1 className="text-center mb-4">{t('signupPage.header')}</h1>
        <div className="form-floating mb-3">
          <input placeholder={t('validation.range')} value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} label="username" name="username" autoComplete="username" required="" id="username" className={usernameClass} />
          <label className="form-label" htmlFor="username">{t('signupPage.username')}</label>
          {errors.username && touched.username ? <div className="invalid-tooltip">{errors.username}</div> : null}
        </div>
        <div className="form-floating mb-3">
          <input placeholder={t('validation.minCount')} value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" aria-describedby="passwordHelpBlock" required="" autoComplete="new-password" type="password" id="password" className={passwordClass} />
          <label className="form-label" htmlFor="password">{t('signupPage.password')}</label>
          {errors.password && touched.password ? <div className="invalid-tooltip">{errors.password}</div> : null}
        </div>
        <div className="form-floating mb-4">
          <input placeholder={t('validation.samePasswords')} value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} name="confirmPassword" required="" autoComplete="new-password" type="password" id="confirmPassword" className={passConfClass} />
          <label className="form-label" htmlFor="confirmPassword">{t('signupPage.passwordConfirmation')}</label>
          {errors.confirmPassword && touched.confirmPassword ? <div className="invalid-tooltip">{errors.confirmPassword}</div> : null}
          {errors.signup ? <div className="invalid-tooltip">{t('validation.uniqueUser')}</div> : null}
        </div>
        <button type="submit" className="w-100 btn btn-outline-primary">{t('signupPage.submit')}</button>
      </fieldset>
    </Form>
  );
};

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
