import Sidebar from '../components/Sidebar'
import ChatSection from '../components/ChatSection'
import GlobalChat from '../components/GlobalChat'
import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/chatContext'
import ChatSectionPlaceholder from '../components/ChatSectionPlaceholder'

const HomePage = () => {

    const { data } = useContext(ChatContext);
    const [callbackForSiderbarRef, setCallbackForSiderbarRef] = useState(null);
    // const [callbackForGlobalRef, setCallbackForGlobalRef] = useState(null)
    return (
        <div className="homePage">
            <div className="container">
                <Sidebar setCallbackForSiderbarRef={setCallbackForSiderbarRef} />
                {/* <ChatSection callbackForGlobalRef={callbackForGlobalRef} callbackForSiderbarRef={callbackForSiderbarRef} /> */}
                {data.chatId !== 'null' ? <ChatSection callbackForSiderbarRef={callbackForSiderbarRef} /> : <ChatSectionPlaceholder />}
                {/* <GlobalChat setCallbackForGlobalRef={setCallbackForGlobalRef} /> */}
            </div>
        </div>
    )
}

export default HomePage