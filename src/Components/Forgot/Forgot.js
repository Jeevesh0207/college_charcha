import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './StyleForgot.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import Loading from '../Loading/Loading'
import { useAuth } from '../../Hook/Auth'

function Forgot({ setisPageForgot, setisPageLogin, onClose }) {
    const Auth = useAuth()
    const [UserID, SetUserID] = useState("")
    const [Password, SetPassword] = useState("")
    const [Re_Password, SetRe_Password] = useState("")
    const [UserOtp, SetUserOtp] = useState("")

    const [OpenEmailRow, SetOpenEmailRow] = useState(true)
    const [OpenOtpRow, SetOpenOtpRow] = useState(false)
    const [OpenPassRow, SetOpenPassRow] = useState(false)

    const [isLoading, setisLoading] = useState("")

    const [UserOtpID, SetUserOtpID] = useState("")
    const [OtpTime, setOtpTime] = useState(30)
    const [isOtpstart, setisOtpstart] = useState(false)
    const [SignUpUserID, setSignUpUserID] = useState("")

    const notify = (type) => {
        switch (type) {
            case 'success':
                toast.success("Reset Link send on your email", {
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
                toast.error("Email does not exist..", {
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

    const OpenLogin = () => {
        setisPageForgot(false)
        setisPageLogin(true)
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

    const SendOtp = async () => {
        // setisOtpstart(true)
        // SetOpenOtpRow(true)
        // SetOpenEmailRow(false)
        // SetOpenPassRow(false)
        setisLoading(true)
        const Obj = {
            Email: UserID
        }
        await axios.post(process.env.REACT_APP_URL + '/password_reset', Obj).then((res) => {
            // Auth.setForgotEmail(UserID)
            console.log(res.data)
            if(res.data.is_successful){
                notify("success")
                SetUserID("")
                setTimeout(()=>{
                    onClose()
                },2000)
            }else{
                notify("err")
            }
            setisLoading(false)
        }).catch((err) => {
            // console.log(err)
            notify("err")
            setisLoading(false)
        })
    }

    const ResendOtp = async () => {
        setisOtpstart(true)
        setisLoading(true)
        const Obj = {
            Email: UserID,
            id: UserOtpID
        }
        await axios.post(process.env.REACT_APP_URL + '/resend_otp', Obj).then((res) => {
            if (res.data.is_successful) {
                setisLoading(false)
                setSignUpUserID(res.data.id)
            } else {
                notify('err')
            }
        }).catch((err) => {
            notify('err')
            setisLoading(false)
            console.log(err)
        })
    }

    const VerifyOtp = async () => {
        SetOpenOtpRow(false)
        SetOpenEmailRow(false)
        SetOpenPassRow(true)
        const Obj = {
            Email: UserID
        }
        await axios.post(process.env.REACT_APP_URL + '/', Obj).then((res) => {

        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (isOtpstart) {
            const timeInterval = setInterval(() => {
                setOtpTime(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        setisOtpstart(false);
                        return 30;
                    }
                });
            }, 1000);

            return () => clearInterval(timeInterval);
        }

    }, [isOtpstart])


    return (
        <div className='Forgot'>
            {
                (isLoading) &&
                <Loading />
            }
            <ToastContainer />
            <div className='Forgot-popup'>
                <div className='Forgot-container'>
                    <div className='Close'>
                        <i className="fa-solid fa-circle-xmark" onClick={onClose}></i>
                    </div>
                    <h1>College Charcha</h1>
                    <h1>We Believe in making a difference</h1>
                    <h2>Forgot</h2>
                    <div className='Forgot-box'>
                        <div className='Right'>
                            {
                                (OpenEmailRow) &&
                                <>
                                    <p>Enter the email address associated with your account</p>
                                    <div className='inpt-row'>
                                        {/* <p>Wrong Email</p> */}
                                        <i className="fa-solid fa-envelope"></i>
                                        <input value={UserID} type='text' placeholder='Email' onChange={(e) => {
                                            SetUserID(e.target.value)
                                        }} />
                                    </div>
                                    <button onClick={SendOtp}>Send Reset Link</button>
                                </>
                            }

                            {
                                (OpenOtpRow) &&
                                <>
                                    <p>Enter the Verification code we just send you on your email address</p>
                                    <p>{Auth.ForgotEmail}</p>
                                    <p className='otp-time'>00 : {OtpTime}</p>
                                    <div className='inpt-row Otp'>
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

                            {
                                (OpenPassRow) &&
                                <>
                                <p>Create New Password</p>
                                    <div className='inpt-row password' id='Pass'>
                                        <i className="fa-solid fa-key"></i>
                                        <input value={Password} type='password' placeholder='Password'
                                            onChange={(e) => { SetPassword(e.target.value) }} />
                                        <i className="fa-solid fa-lock" onClick={() => {
                                            ShowPassword('Pass')
                                        }}></i>
                                    </div>
                                    <div className='inpt-row password' id='CnfmPass'>
                                        <i className="fa-solid fa-key"></i>
                                        <input value={Re_Password} type='password' placeholder='Confirm Password'
                                            onChange={(e) => { SetRe_Password(e.target.value) }} />
                                        <i className="fa-solid fa-lock" onClick={() => {
                                            ShowPassword('CnfmPass')
                                        }}></i>
                                    </div>
                                    <button onClick={OpenLogin}>Reset Password</button>
                                </>
                            }
                        </div>
                    </div>

                    <p>Already have an account? <Link onClick={OpenLogin}>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Forgot