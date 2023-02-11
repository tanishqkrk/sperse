import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { AuthContext } from "../context/AuthContext"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getStorage, ref, getMetadata } from "firebase/storage";
import { useState } from "react"

const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [checkedUserImg, setCheckedUserImg] = useState("/user.svg")
    const [lightTheme, setLightTheme] = useState(false)

    const logOut = () => {
        signOut(auth);
        navigate("/login")
    }

    const switchTheme = () => {
        document.body.classList.toggle("light");
        setLightTheme(!lightTheme)
    }

    const checkImg = (e) => {
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
                    }
                })
        }
        catch (error) {
            // !
        }
    }
    useEffect(() => {
        checkImg()
    }, [])

    return (
        <div className="navbar">
            <div className="logoContainer"><img src="./logo.svg" alt="" className="logo" /><div className="betaText">BETA</div></div>
            <div className="user">
                <div className="userNameAndImg">
                    <img onClick={switchTheme} src={!lightTheme ? "/sun.svg" : "moon.svg"} alt="" className="themeSwitcher" />
                    <img src={checkedUserImg} alt="" className="userImg" />
                    {/* <span className="userName">{currentUser.displayName}</span> */}
                </div>
                <button onClick={logOut} className="logout"><img src="/logout.svg" alt="" className="logoutImg" /></button>
            </div>
        </div>
    )
}

export default Navbar