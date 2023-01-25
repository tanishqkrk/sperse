import ChatNavbar from "./ChatNavbar"
import Messages from "./Messages"
import Input from './Input'

const ChatSection = () => {
    return (
        <div className="chatSection">
            <ChatNavbar />
            <Messages />
            <Input />
        </div>
    )
}

export default ChatSection