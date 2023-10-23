/* eslint-disable react/jsx-props-no-spreading */
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import React, { useRef, useEffect } from 'react';
import { socket } from '../../socket';
import notify from '../../notify';
import filter from '../../clean';

const RenameChannelModal = (props) => {
  const inputEl = useRef(null);
  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.select();
    }
  }, []);

  const { t } = useTranslation('translation');
  const { onHide, channel, channelnames } = props;
  const channelSchema = yup.object({
    name: yup.string()
      .required(t('validation.required'))
      .min(3, t('validation.range'))
      .max(20, t('validation.range'))
      .notOneOf(channelnames, t('validation.unique')),
  });
  const formik = useFormik({
    initialValues: {
      name: filter(channel.name),
    },
    validationSchema: channelSchema,
    onSubmit: ({ name }) => {
      inputEl.current.setAttribute('disabled', true);
      socket.timeout(5000).emit('renameChannel', { name, id: channel.id }, (err) => {
        if (err) {
          notify('rename', 'error', t);
          console.log(err);
        } else {
          onHide();
          notify('rename', 'success', t);
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
          {t('mainPage.modals.renameCh')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <input ref={inputEl} name="name" id="name" type="text" required onChange={formik.handleChange} value={formik.values.name} className={`form-control mb-2 ${touched.name && errors.name ? 'is-invalid' : ''}`} />
          <label className="visually-hidden" htmlFor="name">{t('mainPage.modals.channelName')}</label>
          {errors && touched.name ? <div className="invalid-feedback">{errors.name}</div> : null}
          <div className="d-flex justify-content-end">
            <button type="button" className="me-2 btn btn-secondary" onClick={onHide}>{t('mainPage.modals.cancel')}</button>
            <button type="submit" className="btn btn-primary">{t('mainPage.modals.send')}</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
