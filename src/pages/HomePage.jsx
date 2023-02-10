import Sidebar from '../components/Sidebar'
import ChatSection from '../components/ChatSection'
import GlobalChat from '../components/GlobalChat'
import '../styles/ComponentStyles.css'
import '../styles/Responsiveness.css'
import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/chatContext'

const HomePage = () => {
    // const [isChatLoaded, setIsChatLoaded] = useState(false);
    // if(data.chatId)
    const { data } = useContext(ChatContext);
    const [callbackForSiderbarRef, setCallbackForSiderbarRef] = useState(null);

    return (
        <div className="homePage">
            <div className="container">
                <Sidebar setCallbackForSiderbarRef={setCallbackForSiderbarRef} />
                {data.chatId !== 'null' && <ChatSection callbackForSiderbarRef={callbackForSiderbarRef} />}

                <GlobalChat />
            </div>
        </div>
    )
}

export default HomePage