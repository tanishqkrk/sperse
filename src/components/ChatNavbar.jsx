import { useContext } from "react";
import { ChatContext } from "../context/chatContext";

const ChatsNavbar = ({ callbackForSiderbarRef }) => {
    const { data } = useContext(ChatContext);
    const toggleSidebar = (e) => {
        e.current.classList.toggle('toggleSidebar');
    }
    const toggleSidebarButtonFunction = () => {
        toggleSidebar(callbackForSiderbarRef)
    }

    return (
        <div onClick={toggleSidebarButtonFunction} className="chatNavbar">
            <div className="showContacts">
                <img className="backArrow" src="/back.svg" alt="" />
                <img src="/logo.svg" alt="" className="showContactsIcon" /></div>
            <div className="chatInfo">
                <div className="chatImgContainer">
                    <img src={data.user?.photoURL?.stringValue} alt="" className="chatImg" />
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