/* eslint-disable */
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Formik, Field, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { changeCurrentChannel } from '../../slices/currentChannelSlice';


const NewChannelModal = (props) => {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: props.validationschema,
    onSubmit: values => {
      console.log(values);
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
          Добавить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>  
        <Form onSubmit={formik.handleSubmit}>
          <input name="name" id="name" type="text" required onChange={formik.handleChange} value={formik.values.newChannel} className={`form-control mb-2 ${touched.name && errors.name ? "is-invalid" : ""}`}/>
          <label className="visually-hidden" htmlFor='name'>Добавить канал</label>
          {errors && touched.name ? 
            <div className="invalid-feedback">{errors.name}</div>
            : null}
          <div className="d-flex justify-content-end">
            <button type="button" className="me-2 btn btn-secondary" onClick={props.onHide}>Отменить</button>
            <button type="submit" className="btn btn-primary">Отправить</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const Channels = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const { t } = useTranslation('translation');
  const channels = useSelector((state) => Object.values(state.channelsReducer.entities), shallowEqual);
  const channelNames = channels.map(({ name }) => name);
  const currentChannelId = useSelector((state) => state.currentChannelReducer.id, shallowEqual);

  const newChannelSchema = yup.object({
    name: yup.string()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .notOneOf(channelNames, ('Должно быть уникальным'))
  });

  const Channel = ({channel}) => {
    const { id, name } = channel;
    const handleChangeChannel = () => {
      dispatch(changeCurrentChannel(channel));
    }
    return (
    <li key={id} className="nav-item w-100">
      <button type="button" onClick={handleChangeChannel} className={`w-100 rounded-0 text-start btn ${id === currentChannelId ? "btn-secondary" : '' }`}>
        <span className="me-1">#</span>
          {name}
      </button>
    </li>
    );
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('mainPage.channels.header')}</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => setModalShow(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
        <NewChannelModal
        show={modalShow}
        validationschema={newChannelSchema}
        onHide={() => setModalShow(false)}
        />
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => <Channel channel={channel} key={channel.id} />)}
      </ul>
    </div>
  );
};

export default Channels;
