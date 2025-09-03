import Channels from "../components/chat/Channels"
import Messages from "../components/chat/Messages"
import Header from "../components/Header"
import AuthButton from "../components/AuthButton"

const ChatPage =() => {
  return(
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Header authButton={<AuthButton/>}/>
          <div className="container h-100 my-4 overflow-hidden rounded shadow">

            <div className="row h-100 bg-white flex-md-row">
              <Channels/>
              <Messages />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage