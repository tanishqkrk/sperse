import Message from "./Message"
import { useEffect, useRef, useState, useContext } from "react"
import { ChatContext } from "../context/chatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Messages = () => {
    const [chatMessages, setChatMessages] = useState([]);
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext);
    const messages = useRef();
    useEffect(() => {
        messages.current.scrollTo(0, messages.current.scrollHeight)
    }, [chatMessages])

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setChatMessages(doc.data().messages)
        })
        return () => {
            unSub();
        }
    }, [data.chatId])
    // console.log(currentUser.metadata.createdAt);
    // console.log(chatMessages);
    // console.log(chatMessages[33].img);
    return (
        <div ref={messages} className="messages">
            {
                chatMessages.map((message) => {
                    let owner = message.senderId === currentUser.uid ? "sender" : "receiver"
                    let imgOwner = message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL.stringValue
                    return <Message img={message.img} key={message.id} profileImg={imgOwner} text={message.text} owner={owner} />
                })
            }
        </div>
    )
}

export default Messages