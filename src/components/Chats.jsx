import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"
import { useState, useEffect, useContext, useRef } from "react"
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chatContext";
import Loader from "./Loader"
import { getStorage, ref, getMetadata } from "firebase/storage";

const Chats = ({ sidebar }) => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const [currentChat, setCurrentChat] = useState('');
    const currentChatRef = useRef([]);
    // const { data } = useContext(ChatContext)
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
        let clickedCurrentChat = e.uid.stringValue
        setCurrentChat(() => clickedCurrentChat);
    }

    // console.log(currentChatRef);
    useEffect(() => {
        // console.log(currentChat);
        if (currentChat) {
            if (currentChatRef.current.classList.contains(currentChat)) {
                if (currentChatRef.current.classList[1] === currentChat) {
                    // currentChatRef.current.classList.add("currentUserChat")
                }
            }
        }
    }, [currentChat])

    return (
        <div className="chats">
            {
                Object.entries(chats)
                    .sort(
                        (a, b) => b[1].mapValue.fields?.time?.integerValue - a[1].mapValue.fields?.time?.integerValue
                    )
                    .map(
                        (chat) => {
                            const storage = getStorage();
                            let currentUserImg = ref(storage, chat[1].mapValue.fields.userInfo.mapValue.fields.photoURL.stringValue);
                            let getData = getMetadata(currentUserImg)
                                .then((metadata) => {
                                    if (metadata.contentType.includes("jpeg") || metadata.contentType.includes("png") || metadata.contentType.includes("jpg")) {
                                        return true
                                    }
                                    else {
                                        // checkBoolImg = false
                                        return false
                                    }
                                })
                            let checkImg = () => {
                                getData.then((data) => {
                                    // console.log(data);
                                })
                            }
                            // console.log(chat[1].mapValue.fields?.lastMessage?.mapValue?.fields?.text?.stringValue);
                            // checkImg()
                            // checkImg() ? console.log('1') : console.log('2')
                            // chat[1].mapValue.fields.userInfo.mapValue.fields.photoURL.stringValue
                            return (
                                <div onClick={() => handleSelect(chat[1].mapValue.fields.userInfo.mapValue.fields)} key={chat[1].mapValue.fields.userInfo.mapValue.fields.uid.stringValue} ref={currentChatRef} className={`userChat ${currentChat}`}>
                                    <div className="userImgContainer"><img src={checkImg() ? "/react.png" : "/user.svg"} alt="" className="userImg" /></div>
                                    <div className="userChatText">
                                        <div className="userName">{chat[1].mapValue.fields.userInfo.mapValue.fields.displayName.stringValue}</div>
                                        <p className="lastMessage">{chat[1].mapValue.fields?.lastMessage?.mapValue?.fields?.text?.stringValue}</p>
                                    </div>
                                </div>
                            )
                        }
                    )

            }
        </div>
    )
}

export default Chats