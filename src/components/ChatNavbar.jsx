import { useEffect, useState, useContext } from "react";
import { ChatContext } from "../context/chatContext";
import { getStorage, ref, getMetadata } from "firebase/storage";

const ChatsNavbar = ({ callbackForSiderbarRef }) => {
    const [checkedUserImg, setCheckedUserImg] = useState("/user.svg");
    const { data } = useContext(ChatContext);
    const toggleSidebar = (e) => {
        e.current.classList.toggle('toggleSidebar');
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
        <div className="chatNavbar">
            <div onClick={() => toggleSidebar(callbackForSiderbarRef)} className="showContacts">
                <img className="backArrow" src="/back.svg" alt="" />
                {/* <img src="/logo.png" alt="" className="showContactsIcon" /> */}
            </div>
            <div className="chatInfo">
                <div className="chatImgContainer">
                    <img src={checkedUserImg} alt="" className="chatImg" />
                </div>
                <div className="chatName">{data.user?.displayName?.stringValue}</div>
            </div>
            {/* <div></div> */}
            {/* <div onClick={() => toggleSidebar(callbackForGlobalRef)} className="globalChatTrigger"><img src="/globe.svg" alt="" className="globalChatTriggerImg" /></div> */}
        </div>
    )
}

export default ChatsNavbar