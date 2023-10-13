/* eslint-disable */
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { socket } from '../../index';

const NewChannelModal = (props) => {
  const channelSchema = yup.object({
    name: yup.string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(props.channelnames, ('Должно быть уникальным'))
    });
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelSchema,
    onSubmit: (value) => {
      socket.timeout(5000).emit('newChannel', value, (err) => {
        if (err) {
          // Вывести сообщение об ошибке
          console.log('Timeout Error');
        } else {
          props.onHide();
          // Анблок кнопки
          // inputEl.current.removeAttribute('disabled');
        }
      });
      // socket.on('newChannel', (channel) => {
      //   console.log(channel)
      // });
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
          <input name="name" id="name" type="text" required onChange={formik.handleChange} value={formik.values.newChannel} className={`form-control mb-2 ${touched.name && errors.name ? 'is-invalid' : ''}`} />
          <label className="visually-hidden" htmlFor="name">Добавить канал</label>
          {errors && touched.name
            ? <div className="invalid-feedback">{errors.name}</div>
            : null}
          <div className="d-flex justify-content-end">
            <button type="button" className="me-2 btn btn-secondary" onClick={props.onHide}>Отменить</button>
            <button type="submit" className="btn btn-primary">Отправить</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewChannelModal;
