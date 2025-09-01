import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux"
import { useState } from "react";

import { selectActiveChannel } from "../slices/activeChannelSlice"
import { useAddMessageMutation } from '../api/messagesApi.js';

const MessageForm = () => {
  const {t} = useTranslation()
  const [text, setText] = useState('');

  const activeChannel = useSelector(selectActiveChannel);
  const [addMessage, { error: addMessageError, isLoading: isAddingMessage }] = useAddMessageMutation();

  const handleSubmit = (event, value) => {
    event.preventDefault();
    addMessage({
      body: value,
      channelId: activeChannel.id,
      username: 'admin',})
    setText('')
  }

  if (isAddingMessage) {
    return ;
  }

  return (
    <form noValidate="" className="py-1 border rounded-2" onSubmit={(event) => handleSubmit(event, text)}>
      <div className="input-group has-validation">
        <input name="body" aria-label={t('messages.newMessage')} placeholder={t('messages.textInInput')} className="border-0 p-0 ps-2 form-control" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit" className="btn btn-group-vertical" disabled={isAddingMessage || text.trim() === ''}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
          </svg>
          <span className="visually-hidden">{t('messages.send')}</span>
        </button>
      </div>
    </form>
  )
}

export default MessageForm;