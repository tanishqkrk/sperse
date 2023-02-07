import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase';
import { useState, useRef } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"
import { db } from "../firebase"
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';
import Spinner from "../components/Spinner";
import Loader from "../components/Loader";

const RegisterPage = () => {
    const [err, setErr] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false)
    const inputImg = useRef();
    // const inputImgSrc = inputImg.current.src;
    // console.log(inputImgSrc);
    const [uploadedImg, setUploadedImg] = useState("/user.svg");
    const navigate = useNavigate();
    // console.log(inputImg.current.src);

    const removeSpace = (e) => {
        e.code === "Space" && e.preventDefault()
    }

    const updateImgInUi = () => {
        setUploadedImg("/check.svg");
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            const uniqueFileName = Date.now()
            const storageRef = ref(storage, `${displayName + uniqueFileName}`);

            await uploadBytesResumable(storageRef, file).then(
                () => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        try {
                            await updateProfile(response.user, {
                                displayName,
                                photoURL: downloadURL,
                            });
                            await setDoc(doc(db, "users", response.user.uid), {
                                uid: response.user.uid,
                                displayName,
                                email,
                                photoURL: downloadURL
                            });
                            await setDoc(doc(db, "userChats", response.user.uid), {});

                            navigate("/");
                            location.reload();
                        }
                        catch (error) {
                            setLoading(false)
                            setErr(true)
                            setErrorMsg(error.message)
                        }
                    });
                }
            );
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
                <div className="PageLogoContainer"> <img src="./logo.svg" alt="" className="formLogo" /> Sperse</div>
                <h4 className="registerTitle title">Register</h4>
                <form onSubmit={handleSubmit} className='registerForm form'>
                    <input pattern="[A-Za-z0-9 ]{1,32}" placeholder='Display name (Only letter & numbers)' className='registerInput  writtenInput' type="text" name="" />
                    <input onKeyDown={removeSpace} placeholder='Email' className='registerInput writtenInput' type="email" name="" />
                    <input placeholder='Password' className='registerInput  writtenInput' type="password" name="" />
                    <label className='avatarLabel' htmlFor="avatar">
                        <img ref={inputImg} className='userImage' src={uploadedImg} alt="" />
                        Add an avatar</label>
                    <input onChange={updateImgInUi} id="avatar" accept=".jpg, .jpeg, .png" className='registerInput input ' type="file" name="" />
                    {err && <span className='error-message'>{errorMsg}</span>}
                    <button disabled={loading} className='submit'>Sign up</button>
                </form>
                <p className='prompt'>Have an account? <Link to="/login" className="redirect">Login</Link></p>
            </div>
        </div>
    )
}

export default RegisterPage