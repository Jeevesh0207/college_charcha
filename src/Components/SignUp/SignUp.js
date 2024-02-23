import React, { useEffect, useState } from 'react'
import './StyleSignUp.css'
import { Link} from 'react-router-dom'
import { auth, provider } from "../../Firebase/Config"
import { signInWithPopup } from 'firebase/auth'
import { useAuth } from '../../Hook/Auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading/Loading'
import axios from 'axios'

function SignUp({ setisPageLogin, setisPageSignUp, onClose }) {
    const Auth = useAuth()
    const [Name, SetName] = useState("")
    const [Email, SetEmail] = useState("")
    const [Course, SetCourse] = useState("")
    const [Title, SetTitle] = useState("")
    const [Phone, SetPhone] = useState("")
    const [Password, SetPassword] = useState("")
    const [UserOtp, SetUserOtp] = useState("")
    const [OpenOtpRow, SetOpenOtpRow] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [OtpTime, setOtpTime] = useState(30)
    const [isOtpstart, setisOtpstart] = useState(false)
    const [SignUpUserID, setSignUpUserID] = useState("")

    const OpenLogin = () => {
        setisPageLogin(true)
        setisPageSignUp(false)
    }

    const GoogleLogin = () => {
        signInWithPopup(auth, provider).then((res) => {
            const Email = res.user.email
            const UserName = res.user.displayName
            const Token = {
                Email,
                UserName,
            }
            notify("success")
            localStorage.setItem("Token", JSON.stringify(Token))
            Auth.setisLogin(true)
            Auth.SetUserData(UserName, Email)
            setisPageLogin(false)
            setisPageSignUp(false)
        }).catch((err) => {
            console.log(err)
        })
    }

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
            case 'User already exist':
                toast.error("User already exist", {
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
            case 'val_name':
                toast.error("Please ensure Name are provided.", {
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
            case 'val_email':
                toast.error("Please ensure Email are provided.", {
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
            case 'val_phone':
                toast.error("Please ensure Phone number are provided.", {
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
            case 'val_course':
                toast.error("Please ensure Course are provided.", {
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
            case 'val_pass':
                toast.error("Please ensure Password min length 8-20.", {
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
                toast.error("Email and password do not match.", {
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
            case 'wrong otp':
                toast.error("Wrong Otp", {
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


    const input_fields = {
        username: /^[a-z\d ]/,
        email: /^([a-zA-Z\d.-]+)@([a-zA-Z\d-]+)\.([a-zA-Z]{2,8})(\.[a-zA-Z]{2,8})?$/,
        password: /^[#\w@_-]{8,20}$/,
        telephone: /^\d{10,11}$/
    };


    const validateInput = (value, regex) => {
        return regex.test(value);
    };


    const SignUpButton = async () => {
        if (!Name.trim().length) {
            notify('val_name');
            return;
        }
        if (!validateInput(Email, input_fields.email)) {
            notify('val_email');
            return;
        }
        if (!validateInput(Phone, input_fields.telephone)) {
            notify('val_phone');
            return;
        }
        if (!validateInput(Password, input_fields.password)) {
            notify('val_pass');
            return;
        }
        Auth.SetSignUpFormData(Name, Title, Email, Phone, Course, Password)
        const Obj = {
            Email: Email
        }
        setisLoading(true)
        await axios.post(process.env.REACT_APP_URL + '/send_otp', Obj).then(async (res) => {
            // console.log(res.data)
            if (res.data.error === "User already exist") {
                notify("User already exist")
                setisLoading(false)
            }
            else {
                // console.log(res.data)
                setSignUpUserID(res.data.id)
                setisLoading(false)
                setisOtpstart(true)
                SetOpenOtpRow(true)
            }
        }).catch((err) => {
            console.log(err)
            notify('err')
            setisLoading(false)
        })

    };

    const ResendOtp = async () => {
        setisOtpstart(true)
        setisLoading(true)
        const Obj = {
            Email: Email,
            id: SignUpUserID
        }
        await axios.post(process.env.REACT_APP_URL + '/resend_otp', Obj).then((res) => {
            if (res.data.is_successful) {
                setSignUpUserID(res.data.id)
            } else {
                notify('err')  
            }
            setisLoading(false)
        }).catch((err) => {
            notify('err')
            setisLoading(false)
            console.log(err)
        })
    }

    const VerifyOtp = async () => {
        setisLoading(true)
        const Obj = {
            id: SignUpUserID
        }
        await axios.post(process.env.REACT_APP_URL + '/fetch_otp', Obj).then(async (res) => {
            if (res.data.is_successful) {
                if (UserOtp !== res.data.fetch_otp) {
                    notify('wrong otp')
                    setisLoading(false)
                } else {
                    const Token = {
                        Email: Auth.SignUpEmail,
                        UserName: Auth.SignUpName,
                    }
                    const Obj = {
                        id: SignUpUserID,
                        Name: Auth.SignUpName,
                        Email: Auth.SignUpEmail,
                        Title: Auth.SignUpTitle,
                        Course: Auth.SignUpCourse,
                        Phone: Auth.SignUpPhone,
                        Password: Auth.SignUpPassword
                    }
                    await axios.post(process.env.REACT_APP_URL + '/verify_user', Obj).then((res) => {
                        if (res.data.is_successful) {
                            Auth.SetUserData(Auth.SignUpName, Auth.SignUpEmail)
                            localStorage.setItem("Token", JSON.stringify(Token))
                            Auth.setisLogin(true)
                            setisLoading(false)
                            setisPageLogin(false)
                            setisPageSignUp(false)
                        } else {
                            notify('err')
                            setisLoading(false)
                        }
                    }).catch((err) => {
                        notify('err')
                        setisLoading(false)
                        console.log(err)
                    })


                }
            } else {
                notify('err')
                setisLoading(false)
            }
        }).catch((err) => {
            notify('err')
            setisLoading(false)
            console.log(err)
        })
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

    useEffect(() => {
        if (isOtpstart) {
            const timeInterval = setInterval(() => {
                setOtpTime(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        // Reset the timer when it reaches 0
                        setisOtpstart(false);
                        return 30;
                    }
                });
            }, 1000);

            return () => clearInterval(timeInterval);
        }

    }, [isOtpstart])

    return (
        <div className='SignUp'>
            <ToastContainer />
            {
                (isLoading) &&
                <Loading />
            }
            <div className='SingnUp-popup'>
                {
                    (!OpenOtpRow) &&
                    <div className='SignUp-container'>
                        <div className='Close'>
                            <i className="fa-solid fa-circle-xmark" onClick={onClose}></i>
                        </div>
                        <h1>College Charcha</h1>
                        <h1>We Believe in making a difference</h1>
                        <h2>SIGN UP</h2>
                        <p>Please fill the details and create an account</p>
                        <div className='SignUp-box'>
                            <div className='Left'>
                                <div className='inpt-row'>
                                    {/* <p>Wrong Email</p> */}
                                    <i className="fa-solid fa-address-card"></i>
                                    <input value={Name} type='text' placeholder='Name' onChange={(e) => {
                                        SetName(e.target.value)
                                    }} />
                                </div>
                                <div className='inpt-row'>
                                    <i className="fa-solid fa-envelope"></i>
                                    <input value={Email} type='text' placeholder='Email' onChange={(e) => {
                                        SetEmail(e.target.value)
                                    }} />
                                </div>
                                <div className='inpt-row'>
                                    <i className="fa-solid fa-book-open"></i>
                                    <input value={Course} type='text' placeholder='Course you want to purse' onChange={(e) => {
                                        SetCourse(e.target.value)
                                    }} />
                                </div>
                            </div>
                            <div className='Right'>
                                <div className='inpt-row'>
                                    <i className="fa-solid fa-message"></i>
                                    <input value={Title} type='text' placeholder='Title' onChange={(e) => {
                                        SetTitle(e.target.value)
                                    }} />
                                </div>
                                <div className='inpt-row'>
                                    <i className="fa-solid fa-phone"></i>
                                    <input value={Phone} type='text' placeholder='Phone number' onChange={(e) => {
                                        SetPhone(e.target.value)
                                    }} />
                                </div>
                                <div className='inpt-row password' id='Pass'>
                                    <i className="fa-solid fa-key"></i>
                                    <input value={Password} type='password' placeholder='Create Password' onChange={(e) => {
                                        SetPassword(e.target.value)
                                    }} />
                                    <i className="fa-solid fa-lock" id='passID' onClick={() => {
                                        ShowPassword('Pass')
                                    }}></i>
                                </div>
                            </div>
                        </div>
                        <button onClick={SignUpButton}>SIGN UP</button>
                        <p>Already have an account? <Link onClick={OpenLogin}>Login!</Link></p>
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
                }
                {
                    (OpenOtpRow) &&
                    <div className='SignUp-container'>
                        <div className='Close'>
                            <i className="fa-solid fa-circle-xmark" onClick={onClose}></i>
                        </div>
                        <h1>College Charcha</h1>
                        <h1>We Believe in making a difference</h1>
                        <h2>Verification</h2>
                        <p>Yow will get a OTP via email on</p>
                        <p>{Auth.SignUpEmail}</p>
                        <p className='otp-time'>00 : {OtpTime}</p>
                        <div className='VerifyOtp'>

                            {
                                (OpenOtpRow) &&
                                <>
                                    <div className='input-row'>
                                        <input value={UserOtp} type='text' placeholder='••••••'
                                            onChange={(e) => { SetUserOtp(e.target.value) }} />
                                    </div>
                                    <div className='Otp-btn'>
                                        <button onClick={() => {
                                            (!isOtpstart) && ResendOtp()
                                        }}>Resend Otp</button>
                                        <button onClick={VerifyOtp}>Verify Otp</button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                }
                <p>Already have an account? <Link onClick={OpenLogin}>Login</Link></p>
            </div>
        </div>
        // </div >
    )
}

export default SignUp