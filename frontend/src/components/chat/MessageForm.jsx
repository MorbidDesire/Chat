import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import _ from 'lodash';
import cn from 'classnames';
import useAuth from '../../useAuth';
import { SocketContext } from '../../context/index';
import messageBtn from '../../assets/msgBtn.svg';
import notify from '../../notify';

const MessageForm = ({ currentChannelId, t }) => {
  const socket = useContext(SocketContext);
  const [text, setText] = useState('');
  const { username } = useAuth();
  const inputEl = useRef(null);
  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, [currentChannelId]);

  const handleChange = ({ target }) => {
    setText(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    inputEl.current.setAttribute('disabled', true);
    const post = {
      text,
      author: username,
      channelId: currentChannelId,
      id: _.uniqueId(),
    };
    socket.timeout(5000).emit('newMessage', post, (err) => {
      if (err) {
        notify('add', 'error', t);
        console.log(err);
      }
      inputEl.current.removeAttribute('disabled');
      inputEl.current.focus();
    });
    setText('');
  };

  const inputClass = cn('border-0', 'p-0', 'ps-2', 'form-control');

  return (
    <div className="mt-auto px-5 py-3">
      <form noValidate className="py-1 border rounded-2" onSubmit={handleSubmit}>
        <div className="input-group has-validation">
          <input name="body" ref={inputEl} aria-label={t('mainPage.messages.new')} placeholder={t('mainPage.messages.placeholder')} className={inputClass} value={text} onChange={handleChange} />
          <button type="submit" disabled={text.trim() === ''} className="btn btn-group-vertical">
            <img src={messageBtn} alt={t('mainPage.messages.send')} />
            <span className="visually-hidden">{t('mainPage.messages.send')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
