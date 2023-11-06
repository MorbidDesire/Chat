/* eslint-disable react/jsx-props-no-spreading */
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { socket } from '../../socket';
import notify from '../../notify';
import { setCurrentChannel } from '../../slices/channelsSlice';

const NewChannelModal = (props) => {
  const { t } = useTranslation('translation');
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const { channelnames, onHide } = props;
  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  });
  const channelSchema = yup.object({
    name: yup.string().trim()
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
    onSubmit: async (value) => {
      try {
        const { data } = await socket.timeout(5000).emitWithAck('newChannel', value);
        dispatch(setCurrentChannel(data));
        formik.setValues({ name: '' }, false);
        onHide();
        notify('success', t, 'add');
      } catch (err) {
        notify('error', t);
        console.log(err);
      }
    },
  });

  const {
    errors, touched, handleChange, values, isSubmitting, handleSubmit,
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
          {t('mainPage.modals.addCh')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <fieldset disabled={isSubmitting}>
            <input name="name" ref={inputEl} id="name" type="text" required onChange={handleChange} value={values.name} className={inputClass} />
            <label className="visually-hidden" htmlFor="name">{t('mainPage.modals.channelName')}</label>
            {errors && touched.name
              ? <div className="invalid-feedback">{errors.name}</div>
              : null}
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

export default NewChannelModal;
