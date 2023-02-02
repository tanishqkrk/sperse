import Sidebar from '../components/Sidebar'
import ChatSection from '../components/ChatSection'
import '../styles/ComponentStyles.css'
import '../styles/Responsiveness.css'
import { useEffect, useState } from 'react'

const HomePage = () => {
    const [callbackForSiderbarRef, setCallbackForSiderbarRef] = useState(null);
    return (
        <div className="homePage">
            <div className="container">
                <Sidebar setCallbackForSiderbarRef={setCallbackForSiderbarRef} />
                <ChatSection callbackForSiderbarRef={callbackForSiderbarRef} />
            </div>
        </div>
    )
}

export default HomePage