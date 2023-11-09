/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from 'react-i18next';
import React, {
  useState, useRef, useEffect,
} from 'react';
import _ from 'lodash';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { channelsSelectors } from '../../slices/channelsSlice.js';
import NewChannelModal from '../modals/NewChModal';
import RenameChannelModal from '../modals/RenameChModal';
import RemoveChannelModal from '../modals/RemoveChModal';
import chnlBtn from '../../assets/chnlBtn.svg';
import Channel from './Channel.jsx';

const Channels = () => {
  const [modalChannel, setModalChannel] = useState('');
  const [modalNewCh, setModalNew] = useState(false);
  const [modalRenameCh, setModalRename] = useState(false);
  const [modalRemoveCh, setModalRemove] = useState(false);
  const { t } = useTranslation('translation');
  const channels = useSelector(channelsSelectors.selectAll);
  const { currentChannelId } = useSelector(channelsSelectors.selectEntities);
  const channelsBox = useRef(null);
  const lastChannelId = Number(_.last(useSelector(channelsSelectors.selectIds)));
  const defaultChannelId = Number(_.head(useSelector(channelsSelectors.selectIds)));

  useEffect(() => {
    if (channelsBox.current.scrollHeight !== channelsBox.current.offsetHeight) {
      if (currentChannelId === defaultChannelId) {
        channelsBox.current.scrollTo(0, 0);
      }
      if (currentChannelId === lastChannelId) {
        channelsBox.current.scrollTo(0, channelsBox.current.scrollHeight);
      }
    }
  }, [currentChannelId, lastChannelId]);

  const channelNames = channels.map(({ name }) => name);
  const ulClass = cn('nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block');

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('mainPage.channels.header')}</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => setModalNew(true)}>
          <img src={chnlBtn} alt={t('mainPage.channels.add')} />
          <span className="visually-hidden">+</span>
        </button>
        <NewChannelModal
          show={modalNewCh}
          onHide={() => setModalNew(false)}
          channelnames={channelNames}
        />
        {modalChannel && (
        <RenameChannelModal
          show={modalRenameCh}
          onHide={() => { setModalRename(false); setModalChannel(''); }}
          channelnames={channelNames}
          channel={modalChannel}
        />
        )}
        {modalRemoveCh && (
        <RemoveChannelModal
          show={modalRemoveCh}
          onHide={() => { setModalRemove(false); setModalChannel(''); }}
          channelnames={channelNames}
          channel={modalChannel}
        />
        )}
      </div>
      <ul id="channels-box" ref={channelsBox} className={ulClass}>
        {channels.map((channel) => (
          <Channel
            channel={channel}
            currentChannelId={currentChannelId}
            key={channel.id}
            t={t}
            setModalChannel={setModalChannel}
            setModalRemove={setModalRemove}
            setModalRename={setModalRename}
          />
        ))}
      </ul>
    </div>
  );
};

export default Channels;
