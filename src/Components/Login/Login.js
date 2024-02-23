import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './StyleLogin.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, provider } from "../../Firebase/Config"
import { signInWithPopup } from 'firebase/auth'
import { useAuth } from '../../Hook/Auth';
import Loading from '../Loading/Loading'
import axios from 'axios';

function Login({ setisPageLogin, setisPageForgot, setisPageSignUp, onClose }) {
    const Auth = useAuth()
    const [UserID, SetUserID] = useState("")
    const [Password, SetPassword] = useState("")
    const [isWrongEmail, SetisWrongEmail] = useState(false)
    const [isWrongPass, SetisWrongPass] = useState(false)
    const [isLoading, setisLoading] = useState(false)

    const notify = (type) => {
        switch (type) {
            case 'success':
                toast.success("Login Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                break;
            case 'empty':
                toast.error("Please ensure both Email and Password are provided.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                break;
            case 'email not exist':
                toast.error("Email does not exist.. Please create your account first", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                break;
            case 'notmatch':
                toast.error("Email and password does not match.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                break;
            default:
                toast.error("Try Again....", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                break;
        }

    }

    const GoogleLogin = () => {
        signInWithPopup(auth, provider).then((res) => {
            const Email = res.user.email
            const UserName = res.user.displayName
            const Token = {
                Email,
                UserName,
            }
            localStorage.setItem("Token", JSON.stringify(Token))
            Auth.SetUserData(UserName, Email)
            Auth.setisLogin(true)
            setisPageLogin(false)
            setisPageSignUp(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    const OpenSignUp = () => {
        setisPageLogin(false)
        setisPageSignUp(true)
    }
    const OpenForgot = () => {
        setisPageForgot(true)
        setisPageLogin(false)
    }

    const LoginButton = async () => {
        setisLoading(true)
        const Obj = {
            Email: UserID,
            Password: Password
        }
        if (!UserID || !Password) {
            notify('empty')
            return;
        }
        await axios.post(process.env.REACT_APP_URL + '/login', Obj).then((res) => {
            console.log(res.data)
            if (res.data.is_successful) {
                const UserName=res.data.username
                Auth.SetUserData(res.data.username, UserID)
                const Token={
                    Email:UserID,
                    UserName:UserName,
                }
                localStorage.setItem("Token", JSON.stringify(Token))
                Auth.setisLogin(true)
                setisLoading(false)
                setisPageLogin(false)
                setisPageSignUp(false)
            }else if(res.data.error==="User does not exist"){
                notify('email not exist')
            }else{
                notify("notmatch")
            }
            setisLoading(false)
        }).catch((err) => {
            console.log(err)
            notify('err')
            setisLoading(false)
        })
    }

    const InputRed = (id) => {
        const Inpt_ID = document.getElementById(id)
        if (Inpt_ID.style.border === '1px solid rgb(46, 46, 46)') {
            Inpt_ID.style.border = '1.5px solid #ff2523'
        } else {
            Inpt_ID.style.border = '1px solid #2e2e2e'
        }
    }

    const ShowPassword = (id) => {
        const Pass = document.getElementById(id).children[2]
        const inptType = document.getElementById(id).children[1]
        if (Pass.className === "fa-solid fa-lock") {
            Pass.className = "fa-solid fa-unlock"
            inptType.type = 'text'
        } else {
            Pass.className = "fa-solid fa-lock"
            inptType.type = 'password'
        }
    }

    return (
        <div className='Login'>
            <ToastContainer />
            {
                (isLoading) &&
                <Loading />
            }
            <div className='Login-popup'>
                <div className='Login-container'>
                    <div className='Close'>
                        <i className="fa-solid fa-circle-xmark" onClick={onClose}></i>
                    </div>
                    <h1>College Charcha</h1>
                    <h1>We Believe in making a difference</h1>
                    <h2>LOGIN</h2>
                    <p>Enter your credentials to connect</p>
                    <div className='Login-box'>
                        <div className='Right'>
                            <div className='inpt-row Email' id='Email_ID'>
                                {
                                    (isWrongEmail) && <p>Wrong Email</p>
                                }
                                <i className="fa-solid fa-envelope"></i>
                                <input value={UserID} type='text' placeholder='Email' onChange={(e) => {
                                    SetUserID(e.target.value)
                                }}
                                />
                            </div>
                            <div className='inpt-row password' id='Pass'>
                                {
                                    (isWrongEmail) && <p>Wrong Email</p>
                                }
                                <i className="fa-solid fa-key"></i>
                                <input value={Password} type='password' placeholder='Password'
                                    onChange={(e) => { SetPassword(e.target.value) }}
                                />
                                <i className="fa-solid fa-lock" onClick={() => {
                                    ShowPassword('Pass')
                                }}></i>
                            </div>
                        </div>
                    </div>
                    <div className='forgot'>
                        <p onClick={OpenForgot} >Forgot Password?</p>
                    </div>
                    <button onClick={LoginButton}>LOGIN</button>
                    <p>Don't have an account? <Link onClick={OpenSignUp}>Sign Up!</Link></p>
                    <div className='OR'>
                        <p></p>
                        <span>OR</span>
                        <p></p>
                    </div>
                    <div className='GmailandFacebook'>
                        <Link onClick={GoogleLogin}>
                            <div className='gmailbtn'>
                                <i className="fa-brands fa-google"></i>
                                <span></span>
                                <p>Google</p>
                            </div>
                        </Link>
                        {/* <Link>
                            <div className='gmailbtn facebook'>
                                <i className="fa-brands fa-facebook"></i>
                                <span></span>
                                <p>Facebook</p>
                            </div>
                        </Link> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login