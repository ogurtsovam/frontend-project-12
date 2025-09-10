import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Message from './Message'
import Spinner from '../Spinner.jsx'
import { selectActiveChannel } from '../../slices/activeChannelSlice'
import { useGetMessagesQuery } from '../../api/messagesApi.js'
import MessageForm from '../../forms/MessageForm.jsx'

const Messages = () => {
  const { t } = useTranslation()
  const activeChannel = useSelector(selectActiveChannel)
  const { data: messages = [], isLoading } = useGetMessagesQuery()

  if (!activeChannel) return null

  const activeChannelMessages = messages.filter(
    msg => msg.channelId === activeChannel.id,
  )

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="col p-0 h-100 position-relative">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {activeChannel.name}
            </b>
          </p>
          <span className="text-muted">{t('messages.count', { count: activeChannelMessages.length })}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {activeChannelMessages.map(message => (
            <Message key={message.id} message={message} />
          ))}
          <div
            ref={(el) => {
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
          </div>
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </div>
  )
}

export default Messages
