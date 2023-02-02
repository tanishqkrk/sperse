import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chatContext";
import Loader from "./Loader"

const Chats = ({ sidebar }) => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)
    // console.log(Object.entries(chats)[0]);
    useEffect(() => {
        const getChats = () => {
            setLoading(true)
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                doc?._document?.data?.value?.mapValue?.fields !== undefined ? setChats(doc?._document?.data?.value?.mapValue?.fields) : setChats([])
            });
            return () => {
                unsub();
            }
        }
        if (currentUser.uid && !loading) {
            getChats();
        }
    }, [currentUser.uid])

    const handleSelect = (e) => {
        sidebar.current.classList.remove("toggleSidebar")
        dispatch({ type: "CHANGE_USER", payload: e });
    }
    // console.log(Object.entries(chats)[0][1]);
    return (
        <div className="chats">
            {Object.entries(chats).sort((a, b) => b[1].mapValue.fields?.time?.integerValue - a[1].mapValue.fields?.time?.integerValue).map((chat) => {
                return (
                    <div onClick={() => handleSelect(chat[1].mapValue.fields.userInfo.mapValue.fields)} key={chat[1].mapValue.fields.userInfo.mapValue.fields.uid.stringValue} className={`userChat ${chat[1].mapValue.fields.userInfo.mapValue.fields.uid.stringValue}`}>
                        <div className="userImgContainer"><img src={chat[1].mapValue.fields.userInfo.mapValue.fields.photoURL.stringValue} alt="" className="userImg" /></div>
                        <div className="userChatText">
                            <div className="userName">{chat[1].mapValue.fields.userInfo.mapValue.fields.displayName.stringValue}</div>
                            <p className="lastMessage">{chat[1].mapValue.fields?.lastMessage?.mapValue?.fields?.text?.stringValue}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Chats