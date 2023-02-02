import { collection, query, where, getDoc, getDocs, doc, updateDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useContext, useState } from "react"
import { db } from "../firebase"
import { AuthContext } from "../context/AuthContext"
import Spinner from "../components/Spinner"
import { ChatContext } from "../context/chatContext";
const Search = () => {

    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const [errorMsg, setErrorMsg] = useState("")
    // const [loading, setLoading] = useState(false)
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext)


    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("email", "==", userName));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
            // setLoading(true)
        }
        catch (error) {
            // setLoading(false)
            setErr(true)
        }
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
        e.code === "Space" && e.preventDefault()
    }

    const handleSelect = async () => {
        const combinedId = currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid

        try {
            const response = await getDoc(doc(db, "chats", combinedId))
            if (!response.exists()) {
                await setDoc(doc(db, "chats", combinedId), { messages: [] });
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
            }
        }
        catch (error) {
            setErrorMsg(error.message)
        }
        setUser(null);
        setUserName("")

    }
    return (
        <div className="search">
            <div className="searchForm">
                <input
                    required
                    type="text"
                    placeholder="Find a user"
                    onKeyDown={handleKey}
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                />
            </div>
            {
                // loading && <Spinner />
            }
            {
                err && <span style={{ width: "80%", display: "block" }} className="error-message">{errorMsg}</span>
            }
            {
                user && <div onClick={handleSelect} style={{ background: "#5852D6" }} className="userChat">
                    <div className="userImgContainer"><img src={user.photoURL} alt="" className="userImg" /></div>
                    <div className="userName">{user.displayName}</div>
                </div>
            }

        </div>
    )
}

export default Search