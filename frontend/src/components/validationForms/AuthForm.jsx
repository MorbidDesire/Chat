import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
import cn from 'classnames';
import useAuth from '../../useAuth';
import routes from '../../routes';

const AuthForm = ({ t }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const inputEl = useRef(null);
  const fieldsetEl = useRef(null);

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

  const {
    errors, touched, handleChange, handleSubmit, values,
  } = formik;
  const usernameClass = cn('form-control', {
    'is-invalid': touched.username && (errors.username || errors.authorization),
  });
  const passwordClass = cn('form-control', {
    'is-invalid': touched.password && (errors.password || errors.authorization),
  });
  return (
    <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('loginPage.enter')}</h1>
      <fieldset ref={fieldsetEl}>
        <Form.Group className="form-floating mb-3" controlId="username">
          <input name="username" ref={inputEl} autoComplete="username" required onChange={handleChange} placeholder={t('loginPage.usernamePlaceholder')} value={values.username} id="username" className={usernameClass} />
          <label htmlFor="username" className="form-label">{t('loginPage.username')}</label>
        </Form.Group>
        <Form.Group className="form-floating mb-4" controlId="password">
          <input name="password" type="password" autoComplete="current-password" required onChange={handleChange} placeholder={t('loginPage.passwordPlaceholder')} value={values.password} id="password" className={passwordClass} />
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

export default AuthForm;
