import '../styles/PageStyles.css'
import { auth } from '../firebase';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
    const [err, setErr] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value
        const password = e.target[1].value

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
            location.reload();
        }
        catch (error) {
            setErr(true);
            setErrorMsg(error.message)
        }
    }
    return (
        <div className="page">
            <div className="formContainer">
                <div className="logoContainer"> <img src="./logo.svg" alt="" className="formLogo" /> Sperse</div>
                <h4 className="loginTitle title">Login</h4>
                <form onSubmit={handleSubmit} className='loginForm form'>
                    <input placeholder='Email' className='loginInput  writtenInput' type="email" name="" />
                    <input placeholder='Password' className='loginInput  writtenInput' type="password" name="" />
                    {err && <span className='error-message'>{errorMsg}</span>}
                    <button className='submit'>Login</button>
                </form>
                <p className='prompt'>First time? <Link to="/register" className="redirect">Signup</Link></p>
            </div>
        </div>
    )
}

export default LoginPage