/* eslint-disable */
import React from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import avatar from '../../assets/signupavatar.jpg';

const SignupPage = () => {
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: Yup.string()
      .required('Обязательное поле')
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
  });

  // const formik = useFormik({
  //   initialValues: {
  //     username: '',
  //     password: '',
  //     passwordConfirmation: '',
  //   },
  //   validationSchema: SignupSchema,
  //   onSubmit: values => {
  //     submitForm(values)
  //   },
  // });
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={avatar} className="rounded-circle" alt="Регистрация" />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={ async (values) => {
                  await axios.post('api/v1/signup', values)
                  .then(({data}) => {
                    console.log(data)
                  })
                  .catch((e) => {
                    console.log(e)
                  })
                }}
              >
                {({ errors, touched }) => {
                  console.log(errors)
                return (
                  <Form className="w-50">
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <div className="form-floating mb-3">
                      <Field placeholder="От 3 до 20 символов" label="username" name="username" autoComplete="username" required="" id="username" className={`form-control ${touched.username && errors.username ? "is-invalid" : ""}`} />
                      <label className="form-label" htmlFor="username">Имя пользователя</label>
                      {errors.username && touched.username ? <div className="invalid-tooltip">{errors.username}</div> : null}
                    </div>
                    <div className="form-floating mb-3">
                      <Field placeholder="Не менее 6 символов" name="password" aria-describedby="passwordHelpBlock" required="" autoComplete="new-password" type="password" id="password" className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}/>
                      <label className="form-label" htmlFor="password">Пароль</label>
                      {errors.password && touched.password ? <div className="invalid-tooltip">{errors.password}</div> : null}
                    </div>
                    <div className="form-floating mb-4">
                      <Field placeholder="Пароли должны совпадать" name="confirmPassword" required="" autoComplete="new-password" type="password" id="confirmPassword" className={`form-control ${touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""}`}/>
                      <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
                      {errors.confirmPassword && touched.confirmPassword ? <div className="invalid-tooltip">{errors.confirmPassword}</div> : null}
                    </div>
                    <button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
                  </Form>
                )}}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;

{/* <form className="w-50">
<h1 className="text-center mb-4">Регистрация</h1>
<div className="form-floating mb-3">
  <input placeholder="От 3 до 20 символов" name="username" autoComplete="username" required="" id="username" className="form-control" value={formik.values.username} onChange={formik.handleChange} />
  <label className="form-label" htmlFor="username">Имя пользователя</label>
  <div className="invalid-tooltip">{errors.username && touched.username ? errors.username : null}</div>
</div>
<div className="form-floating mb-3">
  <input placeholder="Не менее 6 символов" name="password" aria-describedby="passwordHelpBlock" required="" autoComplete="new-password" type="password" id="password" className="form-control is-invalid" value={formik.values.password} onChange={formik.handleChange} />
  <div className="invalid-tooltip">Обязательное поле</div>
  <label className="form-label" htmlFor="password">Пароль</label>
</div>
<div className="form-floating mb-4">
  <input placeholder="Пароли должны совпадать" name="confirmPassword" required="" autoComplete="new-password" type="password" id="confirmPassword" className="form-control is-invalid" value={formik.values.passwordConfirmation} onChange={formik.handleChange} />
  <div className="invalid-tooltip">Пароли должны совпадать</div>
  <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
</div>
<button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
</form> */}