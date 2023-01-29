import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"


const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const logOut = () => {
        signOut(auth);
        navigate("/login")
    }

    const checkPhoto = () => {
        if (currentUser.photoURL) { }
    }

    // console.log(currentUser);
    return (
        <div className="navbar">
            <div className="logoContainer"><img src="./logo.svg" alt="" className="logo" /></div>
            <div className="user">
                <div className="userNameAndImg">
                    <img src={currentUser.photoURL} alt="" className="userImg" />
                    <span className="userName">{currentUser.displayName}</span>
                </div>
                <button onClick={logOut} className="logout">Logout</button>
            </div>
        </div>
    )
}

export default Navbar