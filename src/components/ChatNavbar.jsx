import { useEffect, useState, useContext } from "react";
import { ChatContext } from "../context/chatContext";
import { getStorage, ref, getMetadata } from "firebase/storage";

const ChatsNavbar = ({ callbackForSiderbarRef }) => {
    const [checkedUserImg, setCheckedUserImg] = useState("/user.svg");
    // const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const toggleSidebar = (e) => {
        e.current.classList.toggle('toggleSidebar');
    }
    const toggleSidebarButtonFunction = () => {
        toggleSidebar(callbackForSiderbarRef)
    }
    const checkImg = (e) => {
        try {
            const storage = getStorage();
            const currentUserImg = ref(storage, data.user.photoURL.stringValue);
            getMetadata(currentUserImg)
                .then((metadata) => {
                    if (metadata.contentType.includes("image/jpeg") || metadata.contentType.includes("image/png") || metadata.contentType.includes("image/jpg")) {
                        setCheckedUserImg(data.user.photoURL.stringValue)
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
    }, [data])


    return (
        <div onClick={toggleSidebarButtonFunction} className="chatNavbar">
            <div className="showContacts">
                <img className="backArrow" src="/back.svg" alt="" />
                <img src="/logo.svg" alt="" className="showContactsIcon" /></div>
            <div className="chatInfo">
                <div className="chatImgContainer">
                    <img src={checkedUserImg} alt="" className="chatImg" />
                </div>
                <div className="chatName">{data.user?.displayName?.stringValue}</div>
            </div>
            <div className="chatIcons">
                {/* <div className="videoCallIcon chatIcon"><img src="/videoCallIcon.svg" alt="" className="chatIcon-icon videoCallIcon-icon" /></div> */}
                {/* <div className="addFriendIcon chatIcon"><img src="/addFriendIcon.svg" alt="" className="chatIcon-icon addFriendIcon-icon" /></div> */}
                {/* <div className="moreIcon chatIcon"><img src="/moreIcon.svg" alt="" className="chatIcon-icon moreIcon-icon" /></div> */}
            </div>
        </div>
    )
}

export default ChatsNavbar