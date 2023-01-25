const Search = () => {
    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Find a user"
                />
            </div>
            <div className="userChat">
                <div className="userImgContainer"><img src="/user.svg" alt="" className="userImg" /></div>
                <div className="userName">Himank</div>
            </div>
        </div>
    )
}

export default Search