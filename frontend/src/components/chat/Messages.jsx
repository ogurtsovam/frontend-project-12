import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next";

import Message from "./Message";
import { selectActiveChannel } from "../../slices/activeChannelSlice"
import { useAddMessageMutation, useGetMessagesQuery, useRemoveMessageMutation } from '../../api/messagesApi.js';

const Messages = () => {
  const {t} = useTranslation()
  const activeChannel = useSelector(selectActiveChannel);
  const { data: messages, isLoading } = useGetMessagesQuery()

  if (!activeChannel) {
    return ""
  }

  console.log(messages)

  const activeChannelMessages = messages.filter((message) => message.channelId === activeChannel.id );

  if (isLoading) {
      return <Spinner/>
  }

  return(
<div className="col p-0 h-100">
  <div className="d-flex flex-column h-100">
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># {activeChannel.name}</b>
      </p>
      <span className="text-muted">{t('messages.count', { count: messages.length })}</span>
    </div>
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {activeChannelMessages.map((message) => {
        <Message key={message.id} message={message} />
      })}
    </div>
    
    <div className="mt-auto px-5 py-3">
      <form noValidate="" className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control"  />
          <button type="submit" className="btn btn-group-vertical" disabled="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
            </svg>
            <span className="visually-hidden">{t('messages.send')}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}

export default Messages;