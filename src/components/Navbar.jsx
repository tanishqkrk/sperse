const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logoContainer"><img src="./logo.svg" alt="" className="logo" /></div>
            <div className="user">
                <img src="./user.svg" alt="" className="userImg" />
                <span className="userName">tanishqkrk</span>
                <button className="logout">Logout</button>
            </div>
        </div>
    )
}

export default Navbar