import '../styles/PageStyles.css'

const RegisterPage = () => {
    return (
        <div className="page">
            <div className="formContainer">
                <div className="logoContainer"> <img src="./logo.svg" alt="" className="logo" /> Sperse</div>
                <h4 className="registerTitle title">Register</h4>
                <form className='registerForm form'>
                    <input placeholder='Display name' className='registerInput  writtenInput' type="text" name="" id="" />
                    <input placeholder='Email' className='registerInput  writtenInput' type="email" name="" id="" />
                    <input placeholder='Password' className='registerInput  writtenInput' type="password" name="" id="" />
                    <label className='avatarLabel' htmlFor="avatar">
                        <img className='userImage' src="./user.svg" alt="" />
                        Add an avatar</label>
                    <input id="avatar" className='registerInput input ' type="file" name="" />
                    <button className='submit'>Sign up</button>
                </form>
                <p className='prompt'>Have an account? Login</p>
            </div>
        </div>
    )
}

export default RegisterPage