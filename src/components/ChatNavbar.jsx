const ChatsNavbar = ({ callbackForSiderbarRef }) => {

    const toggleSidebar = (e) => {
        e.current.classList.toggle('toggleSidebar');
        // e.current.style.transform = 'translateX(0)'
    }

    const toggleSidebarButtonFunction = () => {
        toggleSidebar(callbackForSiderbarRef)
    }

    return (
        <div onClick={toggleSidebarButtonFunction} className="chatNavbar">
            <div className="showContacts"><img src="/logo.svg" alt="" className="showContactsIcon" /></div>
            <div className="chatInfo">
                <div className="chatImgContainer">
                    <img src="/user.svg" alt="" className="chatImg" />
                </div>
                <div className="chatName">Himank</div>
            </div>
            <div className="chatIcons">
                <div className="videoCallIcon chatIcon"><img src="/videoCallIcon.svg" alt="" className="chatIcon-icon videoCallIcon-icon" /></div>
                <div className="addFriendIcon chatIcon"><img src="/addFriendIcon.svg" alt="" className="chatIcon-icon addFriendIcon-icon" /></div>
                <div className="moreIcon chatIcon"><img src="/moreIcon.svg" alt="" className="chatIcon-icon moreIcon-icon" /></div>
            </div>
        </div>
    )
}

export default ChatsNavbar