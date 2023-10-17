/* eslint-disable */
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import React, { useCallback } from 'react';
import { socket } from '../../init';

const RenameChannelModal = (props) => {
  const inputEl = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.select();
    }
  }, []);
  const { t } = useTranslation('translation');
  const channelSchema = yup.object({
    name: yup.string()
      .required(t('validation.required'))
      .min(3, t('validation.range'))
      .max(20, t('validation.range'))
      .notOneOf(props.channelnames, t('validation.unique'))
    });
  const formik = useFormik({
    initialValues: {
      name: props.channel.name,
    },
    validationSchema: channelSchema,
    onSubmit: ({ name }) => {
      socket.timeout(5000).emit('renameChannel', { name, id: props.channel.id }, (err) => {
        if (err) {
          // Вывести сообщение об ошибке
          console.log('Timeout Error');
        } else {
          props.onHide();
          // Анблок кнопки
          // inputEl.current.removeAttribute('disabled');
        }
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
          {t('mainPage.modals.renameCh')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <input ref={inputEl} name="name" id="name" type="text" required onChange={formik.handleChange} value={formik.values.name} className={`form-control mb-2 ${touched.name && errors.name ? 'is-invalid' : ''}`} />
          <label className="visually-hidden" htmlFor="name">{t('mainPage.modals.addCh')}</label>
          {errors && touched.name
            ? <div className="invalid-feedback">{errors.name}</div>
            : null}
          <div className="d-flex justify-content-end">
            <button type="button" className="me-2 btn btn-secondary" onClick={props.onHide}>{t('mainPage.modals.cancel')}</button>
            <button type="submit" className="btn btn-primary">{t('mainPage.modals.send')}</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;