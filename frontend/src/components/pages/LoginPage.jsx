import {
  useFormik, Formik, Field, ErrorMessage,
} from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import Navigation from './Navigation';
import avatar from './avatar.json';

const ErrorComponent = ({ error }) => {
  console.log(error);
  return (
    <ErrorMessage
      component="div"
      name="password"
      className="invalid-tooltip"
    />
  );
};

const SignupForm = () => {
  const SignupSchema = Yup.object({
    username: Yup.string().required('Неверные имя пользователя или пароль').min(2, 'Минимум 2 буквы'),
    password: Yup.string().required('Неверные имя пользователя или пароль'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      SignupSchema.validate(formik.values)
        .then(() => {
          console.log(JSON.stringify(values, null, 2));
          formik.errors = {};
          console.log(Object.keys(formik.errors).length);
        })
        .catch(({ message, path }) => {
          formik.errors = { [path]: message };
          console.log(Object.keys(formik.errors).length !== 0, formik.touched.username);
        });
    },
  });

  return (
    <Formik
      validationSchema={SignupSchema}
    >
      <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
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
      </Form>
    </Formik>
  );
};

const Container = () => (
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
              <span>Нет аккаунта? </span>
              <a href="/signup">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LoginPage = () => (
  <>
    <Navigation />
    <Container />
  </>
);

export default LoginPage;
