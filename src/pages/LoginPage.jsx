import '../styles/PageStyles.css'
import { auth } from '../firebase';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import Spinner from '../components/Spinner';
import Loader from '../components/Loader';

const LoginPage = () => {
    const [err, setErr] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const removeSpace = (e) => {
        e.code === "Space" && e.preventDefault()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value
        const password = e.target[1].value

        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password);
            // console.log('Loggedin');
            navigate("/");
            location.reload();
        }
        catch (error) {
            setLoading(false)
            setErr(true);
            setErrorMsg(error.message)
        }
    }
    return (
        <div className="page">
            {loading && <Loader />}
            <div className="formContainer">
                <div className="logoContainer"> <img src="./logo.svg" alt="" className="formLogo" /> Sperse</div>
                <h4 className="loginTitle title">Login</h4>
                <form onSubmit={handleSubmit} className='loginForm form'>
                    <input onKeyDown={removeSpace} placeholder='Email' className='loginInput  writtenInput' type="email" name="" />
                    <input placeholder='Password' className='loginInput  writtenInput' type="password" name="" />
                    {err && <span className='error-message'>{errorMsg}</span>}
                    <button style={{ marginTop: "20px" }} className='submit'>Login</button>
                </form>
                <p className='prompt'>First time? <Link to="/register" className="redirect">Register</Link></p>
            </div>
        </div>
    )
}

export default LoginPage