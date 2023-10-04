/* eslint-disable */
import {
  Formik, Field, useFormik,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import axios from 'axios';
import Navigation from './Navigation';
import avatar from './avatar.json';

const SignupForm = () => {
  const { t } = useTranslation('translation');
  const navigate = useNavigate();
  const SignupSchema = yup.object({
    username: yup.string().required('Введите имя'),
    password: yup.string().required('Введите пароль'),
  });

  const ErrorMessage = () => {
    return (
      <div className='invalid-tooltip' style={{display: 'block'}}>{t('loginPage.error')}</div>
    );
  };

  const submitForm = (values) => {
    axios.post('api/v1/login', values)
    .then(({ data }) => {
      const { token } = data;
      window.localStorage.user = token;
      navigate('/', { replace: false })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }} 
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        submitForm(values)
      }}
    >
      {(formik) => {
        const { errors, touched } = formik;
        return (
        <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('loginPage.enter')}</h1>
          <Form.Group className="form-floating mb-3" controlId="username">
            <Field name="username" required onChange={formik.handleChange} placeholder="Ваш ник" value={formik.values.username} className={`form-control ${touched.username && errors.username ? "is-invalid" : ""}`} />
            <Form.Label>{t('loginPage.username')}</Form.Label>
          </Form.Group>
          <Form.Group className="form-floating mb-4" controlId="password">
            <Field name="password" type="password" required onChange={formik.handleChange} placeholder="Пароль" value={formik.values.password} className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}/>
            <Form.Label>{t('loginPage.password')}</Form.Label>
            {(errors.password || errors.username) && (touched.username && touched.password) ? (
              <ErrorMessage />
            ) : null}
          </Form.Group>
          <Button variant="outline-primary" type="submit" className="w-100 mb-3">
            {t('loginPage.enter')}
          </Button>
        </Form>
      )}}
      {/* <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
        <h1 className="text-center mb-4">Войти</h1>
        <Form.Group className="form-floating mb-3" controlId="username">
          <Field name="username" required type="text" placeholder="Ваш ник" id="username" onChange={formik.handleChange} value={formik.values.username} className={`form-control ${Object.keys(formik.errors).length !== 0 && formik.touched.username ? 'is-invalid' : ''}`} />
          <Form.Label>Ваш ник</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-4" controlId="password">
          <Field name="password" required type="password" placeholder="Пароль" id="password" onChange={formik.handleChange} value={formik.values.password} className={`form-control ${Object.keys(formik.errors).length !== 0 && formik.touched.password ? 'is-invalid' : ''}`} />
          <Form.Label>Пароль</Form.Label>
          {formik.errors && <ErrorComponent error={formik} />}
        </Form.Group>
        <Button variant="outline-primary" type="submit" className="w-100 mb-3">
          Войти
        </Button>
      </Form> */}
    </Formik>
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
              <SignupForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('loginPage.noAcc')} </span>
                <a href="/signup">{t('loginPage.reg')}</a>
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
