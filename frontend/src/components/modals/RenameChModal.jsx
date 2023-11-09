/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import notify from '../../notify';
import { FilterContext, SocketContext } from '../../context/index.js';

const RenameChannelModal = (props) => {
  const socket = useContext(SocketContext);
  const inputEl = useRef(null);
  const dictionary = useContext(FilterContext);
  const { t } = useTranslation('translation');

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.select();
    }
  }, []);

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
      name: dictionary.clean(channel.name),
    },
    validationSchema: channelSchema,
    onSubmit: ({ name }) => {
      socket.timeout(5000).emit('renameChannel', { name, id: channel.id }, (err) => {
        if (err) {
          notify('error', t);
          console.log(err);
        } else {
          onHide();
          notify('success', t, 'rename');
        }
      });
    },
  });

  const {
    errors, touched, handleSubmit, isSubmitting, handleChange, values,
  } = formik;
  const inputClass = cn('form-control', 'mb-2', {
    'is-invalid': touched.name && errors.name,
  });
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
        <Form onSubmit={handleSubmit}>
          <fieldset disabled={isSubmitting}>
            <input ref={inputEl} name="name" id="name" type="text" required onChange={handleChange} value={values.name} className={inputClass} />
            <label className="visually-hidden" htmlFor="name">{t('mainPage.modals.channelName')}</label>
            {errors && touched.name ? <div className="invalid-feedback">{errors.name}</div> : null}
            <div className="d-flex justify-content-end">
              <button type="button" className="me-2 btn btn-secondary" onClick={onHide}>{t('mainPage.modals.cancel')}</button>
              <button type="submit" className="btn btn-primary">{t('mainPage.modals.send')}</button>
            </div>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
