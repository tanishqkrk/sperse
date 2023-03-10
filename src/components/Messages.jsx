import Message from "./Message"
import { useEffect, useRef, useState, useContext } from "react"
import { ChatContext } from "../context/chatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { getStorage, ref, getMetadata } from "firebase/storage";


const Messages = () => {
    const notificationSound = new Audio("/notification.mp3");
    const [checkedUserImg, setCheckedUserImg] = useState("/user.svg");
    const [checkedChatImg, setCheckedChatImg] = useState("/user.svg");
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
            // console.log(doc.data().messages);
        })
        return () => {
            unSub();
        }
    }, [data.chatId])
    // console.log(currentUser.metadata.createdAt);
    // console.log(chatMessages);
    // console.log(chatMessages[33].img);

    const checkUserImg = (e) => {
        try {
            const storage = getStorage();
            const currentUserImg = ref(storage, currentUser.photoURL);
            getMetadata(currentUserImg)
                .then((metadata) => {
                    if (metadata.contentType.includes("image/jpeg") || metadata.contentType.includes("image/png") || metadata.contentType.includes("image/jpg")) {
                        setCheckedUserImg(currentUser.photoURL)
                    }
                    else {
                        setCheckedUserImg("/user.svg")
                        // checkUserImg = "/user.svg";
                        // return checkUserImg
                    }
                })
        }
        catch (error) {
            // !
        }
    }
    const checkChatImg = (e) => {
        try {
            const storage = getStorage();
            const currentUserImg = ref(storage, data.user.photoURL.stringValue);
            getMetadata(currentUserImg)
                .then((metadata) => {
                    if (metadata.contentType.includes("image/jpeg") || metadata.contentType.includes("image/png") || metadata.contentType.includes("image/jpg")) {
                        setCheckedChatImg(data.user.photoURL.stringValue)
                    }
                    else {
                        setCheckedChatImg("/user.svg")
                    }
                })
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        checkUserImg();
    }, [data])

    useEffect(() => {
        if (chatMessages.length > 0) {
            notificationSound.play()
        }
    }, [chatMessages.length])

    return (
        <div ref={messages} className="messages">
            {
                chatMessages.map((message) => {
                    let owner = message.senderId === currentUser.uid ? "sender" : "receiver"
                    let imgOwner = message.senderId === currentUser.uid ? checkedUserImg : checkedChatImg;
                    return <Message img={message.img} key={message.id} profileImg={imgOwner} text={message.text} owner={owner} />
                })
            }
        </div>
    )
}

export default Messages