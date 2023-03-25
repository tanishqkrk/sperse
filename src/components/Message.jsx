import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/chatContext"

const Message = ({ owner, text, profileImg, img }) => {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    // let owner = 'sender'
    // let owner = 'reciever'
    if (owner === 'receiver') {
        return (
            <div className="message">
                <div className="messageInfo">
                    {/* <img src={profileImg} alt="" className="messageInfoChatImg" /> */}
                    {/* <span className="messageInfoChatTime">Just now</span> */}
                </div>
                <div className="messageContent">
                    <p>{text}</p>
                    {img &&
                        <img src={img} alt="" />
                    }
                </div>
            </div>
        )
    }
    else if (owner === 'sender') {
        return (
            <div className="message sender">
                <div className="messageInfo senderInfo">
                    {/* <img src={profileImg} alt="" className="messageInfoChatImg senderInfoChatImg" /> */}
                    {/* <span className="messageInfoChatTime senderInfoChatTime">Just now</span> */}
                </div>
                <div className="messageContent senderContent">
                    <p>{text}</p>
                    {img &&
                        <img className="mediaImg" src={img} alt="" />
                    }
                </div>
            </div>
        )
    }

}

export default Message