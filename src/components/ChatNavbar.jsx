const ChatsNavbar = () => {
    return (
        <div className="chatNavbar">
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