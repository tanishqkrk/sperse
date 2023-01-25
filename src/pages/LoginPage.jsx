const LoginPage = () => {
    return (
        <div className="page">
            <div className="formContainer">
                <div className="logoContainer"> <img src="./logo.svg" alt="" className="logo" /> Sperse</div>
                <h4 className="loginTitle title">Register</h4>
                <form className='loginForm form'>
                    <input placeholder='Email' className='loginInput input writtenInput' type="email" name="" id="" />
                    <input placeholder='Password' className='loginInput input writtenInput' type="password" name="" id="" />
                    <button className='submit'>Login</button>
                </form>
                <p className='prompt'>First time? Signup</p>
            </div>
        </div>
    )
}

export default LoginPage