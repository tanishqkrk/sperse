import { useRef } from "react"
import ChatNavbar from "./ChatNavbar"
import Messages from "./Messages"
import Input from './Input'
import { ChatContext } from '../context/chatContext'
import { useContext } from 'react'


const ChatSection = ({ callbackForSiderbarRef }) => {
    const { data } = useContext(ChatContext);
    return (
        <div className="chatSection">
            <ChatNavbar callbackForSiderbarRef={callbackForSiderbarRef} />
            <Messages />
            <Input />
        </div>
    )
}

export default ChatSection