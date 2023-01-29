import { collection, query, where, getDocs } from "firebase/firestore";
import { useState } from "react"
import { db } from "../firebase"

const Search = () => {

    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("email", "==", userName));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
                // console.log(doc.id, " => ", doc.data());
            });
        }
        catch (error) {
            setErr(true)
        }
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = () => {
        console.log('1');
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
                />
            </div>
            {
                err && <span style={{ width: "80%", display: "block" }} className="error-message">User not found</span>
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