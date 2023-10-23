import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { socket } from '../../socket';
import notify from '../../notify';

const RemoveChannelModal = (props) => {
  const { t } = useTranslation('translation');
  const { onHide, channel } = props;
  const handleRemoveChannel = () => {
    socket.timeout(5000).emit('removeChannel', { id: channel.id }, (err) => {
      if (err) {
        notify('remove', 'error', t);
        console.log(err);
      } else {
        onHide();
        notify('remove', 'success', t);
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
          {t('mainPage.modals.deleteCh')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('mainPage.modals.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <button type="button" className="me-2 btn btn-secondary" onClick={onHide}>{t('mainPage.modals.cancel')}</button>
          <button type="button" className="btn btn-danger" onClick={handleRemoveChannel}>{t('mainPage.modals.delete')}</button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
