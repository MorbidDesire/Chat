/* eslint-disable */
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import * as yup from 'yup';
import axios from 'axios';
import avatar from './avatar.json';

const SignupForm = () => {
  const { t } = useTranslation('translation');
  const navigate = useNavigate();
  const SignupSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const ErrorMessage = ({errors}) => {
    let textError = '';
    if (_.has(errors, 'newtork')) {
      textError = t('loginPage.errors.newtorkError')
    } else {
      textError = t('loginPage.errors.authError')
    }
    return (
      <div className='invalid-tooltip' style={{display: 'block'}}>{textError}</div>
    );
  };

  const submitForm = async (values) => {
    await axios.post('api/v1/login', values)
    .then(({ data }) => {
      localStorage.setItem('userId', data.username);
      localStorage.setItem('token', data.token);
      navigate('/', { replace: false })
    })
    .catch((error) => {
      switch (error.name) {
        case 'AxiosError':
          formik.setErrors({'authorization': '401'});
          console.log(error);
          break;
        default:
          formik.setErrors({'network': '404'});
          console.log(error);
          break;
      }
      // console.log(formik.errors); // Вот здесь обращайся к ошибкам !
    });
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
      submitForm(values)
    },
  });
  const { errors, touched } = formik;
  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('loginPage.enter')}</h1>
      <Form.Group className="form-floating mb-3" controlId="username">
        <input name="username" required onChange={formik.handleChange} placeholder="Ваш ник" value={formik.values.username} className={`form-control ${touched.username && (errors.username || errors.authorization) ? "is-invalid" : ""}`} />
        <label>{t('loginPage.username')}</label>
      </Form.Group>
      <Form.Group className="form-floating mb-4" controlId="password">
        <input name="password" type="password" required onChange={formik.handleChange} placeholder="Пароль" value={formik.values.password} className={`form-control ${touched.password && (errors.password || errors.authorization) ? "is-invalid" : ""}`}/>
        <label>{t('loginPage.password')}</label>
        {(errors) && (touched.username && touched.password) ? (
          <ErrorMessage errors={errors}/>
        ) : null}
      </Form.Group>
      <Button variant="outline-primary" type="submit" className="w-100 mb-3">
        {t('loginPage.enter')}
      </Button>
    </Form>
  )
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
    <Container />
  </>
);

export default LoginPage;
