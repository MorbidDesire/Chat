import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { socket } from '../../socket';
import notify from '../../notify';

const NewChannelModal = (props) => {
  const { t } = useTranslation('translation');
  const { channelnames, onHide } = props;
  const inputEl = useRef(null);
  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  });
  // const inputEl = useCallback((inputElement) => {
  //   if (inputElement) {
  //     inputElement.select();
  //   }
  // }, []);
  const channelSchema = yup.object({
    name: yup.string()
      .required(t('validation.required'))
      .min(3, t('validation.range'))
      .max(20, t('validation.range'))
      .notOneOf(channelnames, t('validation.unique')),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelSchema,
    onSubmit: (value) => {
      inputEl.current.setAttribute('disabled', true);
      socket.timeout(5000).emit('newChannel', value, (err) => {
        if (err) {
          notify('add', 'error', t);
          console.log(err);
        } else {
          formik.setValues({ name: '' }, false);
          onHide();
          notify('add', 'success', t);
        }
        inputEl.current.removeAttribute('disabled');
      });
    },
  });

  const { errors, touched } = formik;
  return (
    <Modal
      {...props}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {t('mainPage.modals.addCh')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <input name="name" ref={inputEl} id="name" type="text" required onChange={formik.handleChange} value={formik.values.name} className={`form-control mb-2 ${touched.name && errors.name ? 'is-invalid' : ''}`} />
          <label className="visually-hidden" htmlFor="name">{t('mainPage.modals.channelName')}</label>
          {errors && touched.name
            ? <div className="invalid-feedback">{errors.name}</div>
            : null}
          <div className="d-flex justify-content-end">
            <button type="button" className="me-2 btn btn-secondary" onClick={onHide}>{t('mainPage.modals.cancel')}</button>
            <button type="submit" className="btn btn-primary">{t('mainPage.modals.send')}</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewChannelModal;
