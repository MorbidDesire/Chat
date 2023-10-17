/* eslint-disable */
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentChannel, currentChannelSelectors } from '../../slices/currentChannelSlice';
import { addChannel, channelsSelectors } from '../../slices/channelsSlice.js';
import NewChannelModal from '../modals/NewChModal';
import RenameChannelModal from '../modals/RenameChModal';
import RemoveChannelModal from '../modals/RemoveChModal';

const Channels = () => {
  const dispatch = useDispatch();
  const [modalChannel, setModalChannel] = useState('')
  const [modalNewCh, setModalNew] = useState(false);
  const [modalRenameCh, setModalRename] = useState(false);
  const [modalRemoveCh, setModalRemove] = useState(false);
  const { t } = useTranslation('translation');
  const channels = useSelector(channelsSelectors.selectAll);
  // console.log(channels)
  const channelNames = channels.map(({ name }) => name);
  // const sos = useSelector((state) => state.channelsReducer)
  // console.log(sos)
  const currentChannelId = useSelector(currentChannelSelectors.selectIds);

  const Channel = ({channel}) => {
    const { id, name, removable } = channel;
    const handleChangeChannel = () => {
      dispatch(changeCurrentChannel(channel));
    }
    if (!removable) {
      return (
        <li key={id} className="nav-item w-100">
        <button type="button" onClick={handleChangeChannel} className={`w-100 rounded-0 text-start text-truncate btn ${id === currentChannelId ? "btn-secondary" : '' }`}>
          <span className="me-1">#</span>
            {name}
        </button>
      </li>
      )
    } else {
      return (
        <li key={id} className="nav-item w-100">
          <Dropdown role="group" className="d-flex btn-group">
            <button type="button" onClick={handleChangeChannel} className={`w-100 rounded-0 text-start text-truncate btn ${id === currentChannelId ? "btn-secondary" : '' }`}>
              <span className="me-1">#</span>
                {name}
            </button>
            <Dropdown.Toggle variant="none" split id="dropdown-basic" aria-expanded="false" className={`flex-grow-0 ${id === currentChannelId ? "btn-secondary" : '' }`}>
              <span className="visually-hidden">{t('mainPage.channels.manageCh')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={() => {setModalChannel(channel);setModalRemove(true)}}>{t('mainPage.channels.delete')}</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => {setModalChannel(channel);setModalRename(true)}}>{t('mainPage.channels.rename')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      );
    }

  };
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('mainPage.channels.header')}</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => setModalNew(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
        <NewChannelModal
        show={modalNewCh}
        onHide={() => setModalNew(false)}
        channelnames={channelNames}
        />
        {modalChannel && <RenameChannelModal
        show={modalRenameCh}
        onHide={() => {setModalRename(false); setModalChannel('')}}
        channelnames={channelNames}
        channel={modalChannel}
        />}
        {modalRemoveCh && <RemoveChannelModal
        show={modalRemoveCh}
        onHide={() => {setModalRemove(false); setModalChannel('')}}
        channelnames={channelNames}
        channel={modalChannel}
        />}
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => <Channel channel={channel} key={channel.id} />)}
      </ul>
    </div>
  );
};

export default Channels;
