import React, {
  useEffect,
  useRef,
  useContext,
} from 'react';
import { FilterContext } from '../../context/index.js';

const MessageBox = ({ channelMessages }) => {
  const dictionary = useContext(FilterContext);
  const messages = useRef(null);
  useEffect(() => {
    messages.current.scrollTo(0, messages.current.scrollHeight);
  }, [channelMessages]);
  return (
    <div id="messages-box" ref={messages} className="chat-messages overflow-auto px-5 ">
      {channelMessages.map(({ author, text, id }) => (
        <div key={id} className="text-break mb-2">
          <b>{author}</b>
          :
          {' '}
          {dictionary.clean(text)}
        </div>
      ))}
    </div>
  );
};

export default MessageBox;
