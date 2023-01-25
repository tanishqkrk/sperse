const Input = () => {
    return (
        <form className="input">
            <input type="text" name="" id="" placeholder="Type a message" />
            <label htmlFor="file"> <img src="/attachmentIcon.svg" alt="" className="attachmentIcon" /></label>
            <input type="file" name="" id="file" />
            <button className="sendBtn" type="submit"><img src="/sendIcon.svg" alt="" className="sendBtnIcon" /></button>
        </form>
    )
}

export default Input