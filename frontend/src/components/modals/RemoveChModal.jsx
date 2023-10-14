/* eslint-disable */
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup';
import React, { useCallback } from 'react';
import { socket } from '../../index';

const RemoveChannelModal = (props) => { 
  const handleRemoveChannel = () => {
    socket.timeout(5000).emit('removeChannel', { id: props.channel.id }, (err) => {
        if (err) {
        // Вывести сообщение об ошибке
        console.log('Timeout Error');
        } else {
        props.onHide();
        // Анблок кнопки
        // inputEl.current.removeAttribute('disabled');
        }
    });
  };
  return (
    <Modal
      {...props}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Удалить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <button type="button" className="me-2 btn btn-secondary" onClick={props.onHide}>Отменить</button>
          <button type="button" className="btn btn-danger" onClick={handleRemoveChannel}>Удалить</button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;