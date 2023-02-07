// import { Timestamp } from "firebase/firestore";
import { arrayUnion, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { useContext, useState, useRef } from "react"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/chatContext"
import { db } from "../firebase";
import { doc } from "firebase/firestore";
import { storage } from "../firebase";
import { uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid"
import { getDownloadURL, ref } from "firebase/storage";

const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState("");
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const handleSend = async (e) => {
        e.preventDefault()
        // console.log(e);
        if (img) {
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img)
            uploadTask.then(
                () => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        try {
                            await updateDoc(doc(db, "chats", data.chatId), {
                                messages: arrayUnion({
                                    id: uuid(),
                                    text,
                                    senderId: currentUser.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL
                                })
                            })
                        }
                        catch (error) {
                        }
                    });
                }
            );
            setImg(null)
            setText("")
        }
        else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            });
            setText("");
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".time"]: Date.now(),
            [data.chatId + ".date"]: serverTimestamp()
        })
        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".time"]: Date.now(),
            [data.chatId + ".date"]: serverTimestamp()
        })
    }

    const handleKey = (e) => {
        if (text === "") {
            e.preventDefault()
        }
        else {
            setImg(null)
            setText("")
            handleSend(e)
        }
    }
    const handleKeyFromInput = (e) => {
        e.code === "Enter" && handleKey(e)
    }
    return (
        <div className="input">
            <input
                onKeyDown={handleKeyFromInput}
                autoFocus
                onChange={(e) => setText(e.target.value)}
                value={text}
                type="text"
                name=""
                id=""
                placeholder="Type a message" />
            <label htmlFor="file"> <img src="/attachmentIcon.svg" alt="" className="attachmentIcon" /></label>
            <input accept=".jpg, .jpeg, .png" onChange={(e) => setImg(e.target.files[0])} type="file" name="" id="file" />
            <button onClick={handleKey} className="sendBtn" type="submit"><img src="/sendIcon.svg" alt="" className="sendBtnIcon" /></button>
        </div>
    )
}

export default Input