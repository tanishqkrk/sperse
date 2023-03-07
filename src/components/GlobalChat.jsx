import { arrayUnion, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase"
import GlobalMessages from "./GlobalChatMessages"
import { useState, useEffect, useContext, useRef } from "react";
import { v4 as uuid } from "uuid"

const GlobalChat = ({ setCallbackForGlobalRef }) => {
    const [message, setMessage] = useState("")
    const { currentUser } = useContext(AuthContext);
    const globalChatRef = useRef();

    useEffect(() => {
        setCallbackForGlobalRef(globalChatRef);
    })

    const createGlobalChat = async (e) => {
        if (message !== "") {
            try {
                await updateDoc(doc(db, "globalChat", "messages"), {
                    messages: arrayUnion({
                        id: uuid(),
                        message: message,
                        date: Timestamp.now(),
                        displayName: currentUser.displayName,
                        email: currentUser.email,
                        photoURL: currentUser.photoURL,
                        uid: currentUser.uid
                    })
                })
            }
            catch (error) {
                console.log(error);
            }
            setMessage("")
        }

    }
    const handleKeyFromInput = (e) => {
        if (e.code === "Enter") {
            createGlobalChat()
            setMessage("")
        }
    }

    return (
        <div ref={globalChatRef} className="globalChat">
            <div className="placeholder">
                <div className="globalChatIcon"><img src="/globe.svg" alt="" className="globalChatIconImg" /></div>
            </div>
            <GlobalMessages />
            <div className="globalInput">
                <input
                    onKeyDown={handleKeyFromInput}
                    autoFocus
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    type="text"
                    name=""
                    id=""
                    placeholder="Type a message globally!" />

                <button
                    onClick={createGlobalChat}
                    disabled={message !== "" ? false : true}
                    className="globalSendBtn"
                    type="submit">
                    <img src="/globe.svg" alt="" className="sendBtnIcon" />
                </button>
            </div>
        </div>
    )
}

export default GlobalChat