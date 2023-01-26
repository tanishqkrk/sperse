import { useRef } from "react"
import ChatNavbar from "./ChatNavbar"
import Messages from "./Messages"
import Input from './Input'

const ChatSection = ({ callbackForSiderbarRef }) => {
    return (
        <div className="chatSection">
            <ChatNavbar callbackForSiderbarRef={callbackForSiderbarRef} />
            <Messages />
            <Input />
        </div>
    )
}

export default ChatSection