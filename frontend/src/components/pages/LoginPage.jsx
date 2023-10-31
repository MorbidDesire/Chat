import { useFormik } from 'formik';
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import * as yup from 'yup';
import avatar from '../../assets/avatar.json';
import useAuth from '../useAuth';
import Navigation from '../Navigation';
import routes from '../../routes';

const AuthForm = ({ t }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const fieldsetEl = useRef(null);
  const inputEl = useRef(null);
  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, []);
  const authSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  const submitForm = async (values, formik) => {
    fieldsetEl.current.setAttribute('disabled', true);
    await axios.post(routes.api.login, values)
      .then(({ data }) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        login();
        navigate(routes.mainPage, { replace: false });
      })
      .catch((error) => {
        switch (error.name) {
          case 'AxiosError':
            formik.setErrors({ authorization: '401' });
            console.log(error);
            break;
          default:
            formik.setErrors({ network: '404' });
            console.log(error);
            break;
        }
      });
    fieldsetEl.current.removeAttribute('disabled');
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: authSchema,
    onSubmit: (values) => {
      submitForm(values, formik);
    },
  });

  const { errors, touched } = formik;
  return (
    <Form disabled={formik.isSubmitting} onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('loginPage.enter')}</h1>
      <fieldset ref={fieldsetEl}>
        <Form.Group className="form-floating mb-3" controlId="username">
          <input name="username" ref={inputEl} autoComplete="username" required onChange={formik.handleChange} placeholder={t('loginPage.usernamePlaceholder')} value={formik.values.username} id="username" className={`form-control ${touched.username && (errors.username || errors.authorization) ? 'is-invalid' : ''}`} />
          <label htmlFor="username" className="form-label">{t('loginPage.username')}</label>
        </Form.Group>
        <Form.Group className="form-floating mb-4" controlId="password">
          <input name="password" required type="password" autoComplete="current-password" onChange={formik.handleChange} placeholder={t('loginPage.passwordPlaceholder')} value={formik.values.password} id="password" className={`form-control ${touched.password && (errors.password || errors.authorization) ? 'is-invalid' : ''}`} />
          <label htmlFor="password" className="form-label">{t('loginPage.password')}</label>
          {errors ? <div className="invalid-tooltip">{t('loginPage.errors.authError')}</div> : null}
        </Form.Group>
        <Button variant="outline-primary" type="submit" className="w-100 mb-3">
          {t('loginPage.enter')}
        </Button>
      </fieldset>
    </Form>
  );
};

const Container = () => {
  const { t } = useTranslation('translation');
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={avatar} className="rounded-circle" alt="Войти" />
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
  );
};

const LoginPage = () => (
  <>
    <Navigation />
    <Container />
  </>
);

export default LoginPage;
