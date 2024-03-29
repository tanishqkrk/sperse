import { useEffect, useState, useContext, useRef } from "react"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const GlobalMessages = () => {

    const { currentUser } = useContext(AuthContext);
    const globaChat = useRef();
    const [isLoaded, setIsLoaded] = useState(false)
    const [globalChatMessages, setGlobalChatMessages] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "globalChat", "messages"), (doc) => {
            setGlobalChatMessages(doc.data())
            setIsLoaded(true)
        });
        return () => unsub();
    }, [])

    useEffect(() => {
        globaChat.current.scrollTo(0, globaChat.current.scrollHeight)
    }, [globalChatMessages])

    return (
        <div ref={globaChat} className="globalChatMessages">
            {
                isLoaded && globalChatMessages.messages.map((message) => {
                    return (
                        <div className="message">
                            <div className="messageInfo">
                                <img src={"/user.svg"} alt="" className="messageInfoChatImg" />
                            </div>
                            <div className="messageContent">
                                <p className={`${message.uid === currentUser.uid && "globalSender"}`}><h6 className="globalChatName">{message.displayName}</h6>{message.message}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default GlobalMessages