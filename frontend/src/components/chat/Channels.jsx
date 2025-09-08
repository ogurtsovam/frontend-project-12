import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react';

import { setActive } from "../../slices/activeChannelSlice"
import Spinner from '../Spinner.jsx';
import Channel from './Channel.jsx';
import { useGetChannelsQuery, useAddChannelMutation} from '../../api/channelsApi.js';
import AddChannelModal from '../modals/AddChannelModal.jsx';
import { selectActiveChannel } from '../../slices/activeChannelSlice';

const Channels = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const { data: channels, isLoading: isGettingChannels } = useGetChannelsQuery()
  const [addChannel, { isLoading: isAddingChannels}] = useAddChannelMutation();
  const activeChannel = useSelector(selectActiveChannel);

useEffect(() => {
  if (!isGettingChannels && channels) {
    const stillExists = channels.some((c) => c.id === activeChannel?.id);
    if (!stillExists) {
      const defaultChannel = channels.find((c) => c.name === 'general');
      dispatch(setActive(defaultChannel));
    }
  }
}, [channels]);


  const [showAdd, updateShowAdd] = useState(false)

  const handleAdd = (value) => addChannel(value);

  if (isGettingChannels || isAddingChannels) {
    return <Spinner/>
  }

  return (
<>
<div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
  <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
    <b>{t('channels.title')}</b>
    <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => updateShowAdd(true)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
      </svg>
      <span className="visually-hidden">+</span>
    </button>
  </div>
  <AddChannelModal handleAdd={handleAdd} show={showAdd} updateShowAdd={() => updateShowAdd(false)} channels={channels.map(c => c.name)} />
  <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
  {channels.map((channel) => (
      <Channel key={channel.id} channel={channel}/>
  ))}
  </ul>
</div>
</>
  )

}

export default Channels