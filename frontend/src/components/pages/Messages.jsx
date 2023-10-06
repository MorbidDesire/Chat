/* eslint-disable */
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../../slices/messageSlice';
import { useAuth } from "../useAuth";

const Messages = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation');
  const currentChannelName = useSelector((state) => state.currentChannelReducer.entities.name)
  const { userId } = useAuth();
  const messages = useSelector((state) => {
    return Object.values(state.messageReducer.entities)
  });
  const count = messages.length;
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const post = {
      text: data.get('body'),
      author: userId,
      id: _.uniqueId(),
    };
    dispatch(addMessage(post));
  }
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {currentChannelName}</b></p>
          <span className="text-muted">{t('mainPage.messages.counter.count', {count})}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 " />
        <div className="mt-auto px-5 py-3">
          <form noValidate="" className="py-1 border rounded-2" onSubmit={handleSubmit}>
            <div className="input-group has-validation">
              <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value="" />
              <button type="submit" disabled="" className="btn btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
