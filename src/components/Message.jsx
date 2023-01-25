const Message = ({ owner }) => {

    // let owner = 'sender'
    // let owner = 'reciever'

    if (owner === 'receiver') {
        return (
            <div className="message">
                <div className="messageInfo">
                    <img src="/user.svg" alt="" className="messageInfoChatImg" />
                    <span className="messageInfoChatTime">Just now</span>
                </div>
                <div className="messageContent">
                    <p>Hey there!</p>
                    {/* <img src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80" alt="" /> */}
                </div>
            </div>
        )
    }
    else if (owner === 'sender') {
        return (
            <div className="message sender">
                <div className="messageInfo senderInfo">
                    <img src="/user.svg" alt="" className="messageInfoChatImg senderInfoChatImg" />
                    <span className="messageInfoChatTime senderInfoChatTime">Just now</span>
                </div>
                <div className="messageContent senderContent">
                    <p>Hey there!</p>
                    {/* <img src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80" alt="" /> */}
                </div>
            </div>
        )
    }

}

export default Message