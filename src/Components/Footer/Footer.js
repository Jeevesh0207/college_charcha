import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

import { ToastContainer, toast } from 'react-toastify'

import './StyleFooter.css'
import { useAuth } from '../../Hook/Auth'
import Loading from '../Loading/Loading'
import axios from 'axios'

function Footer({ setisPageLogin, setisPageSignUp }) {
    const Auth = useAuth()
    const [Email, setEmail] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const OpenUrl = (link) => {
        let newTab = window.open();
        newTab.opener = null;
        newTab.location = link;
        newTab.rel = 'noopener noreferrer';
    }

    const notify = (type) => {
        switch (type) {
            case 'success':
                toast.success("Kindly check your email for contact details", {
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
                    toast.error("Please Fill details", {
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

    const SendMail = async () => {
        if(!Email){
            notify('empty')
            return
        }
        setisLoading(true)
        const Obj = {
            Email: Email
        }
        await axios.post(process.env.REACT_APP_URL + '/get_started', Obj).then((res) => {
            if (res.data.is_successful) {
                notify("success")
                setisLoading(false)
                setEmail("")
                console.log(res.data)
            } else {
                setisLoading(false)
                notify("err")
                console.log(res.data)
            }
        }).catch((err) => {
            setisLoading(false)
            notify('err')
            console.log(err)
        })
    }

    const OpenLogin = () => {
        setisPageLogin(true)
        setisPageSignUp(false)
    }

    const OpenSignUp = () => {
        setisPageLogin(false)
        setisPageSignUp(true)
    }

    return (
        <div className='Footer'>
            <ToastContainer />
            <div className='Top' >
                {
                    (isLoading) &&
                    <Loading />
                }
                <div className='container'>
                    <h1>We Believe in making a Difference</h1>
                    <p>Contact us now and get all the efficient services.Let’s have a chat, Shall we?</p>
                    <div className='input-box'>
                        <input value={Email} type='text' placeholder='Your email here'
                            onChange={(e) => { setEmail(e.target.value) }} />
                        <button onClick={SendMail}>Get Started</button>
                    </div>
                </div>
            </div>
            <div className='Bottom'>
                <div className='container'>
                    <div className='Left'>
                        <div className='Top-logo'>
                            <img src={require('../../img/logo.png')} />
                        </div>
                        <div className='contacts'>
                            <h3>Contacts</h3>
                            <p><i className="fa-solid fa-envelope"></i>info@collegecharcha.in</p>
                            <p><i className="fa-solid fa-phone"></i>+91 9311236933</p>
                            <p><i className="fa-solid fa-location-dot"></i>India</p>
                        </div>
                        <div className='touch'>
                            <h3>Get in Touch</h3>
                            <div className='social'>
                                <i className="fa-brands fa-facebook"
                                    onClick={() => { OpenUrl("https://www.facebook.com/profile.php?id=100093281640759") }}
                                    style={{ color: '#1977f2' }}></i>
                                <i className="fa-brands fa-square-x-twitter"
                                    onClick={() => { OpenUrl("https://www.facebook.com/profile.php?id=100093281640759") }}
                                    style={{ color: '#000000' }}></i>
                                <i className="fa-brands fa-square-whatsapp"
                                    onClick={() => { OpenUrl("https://www.facebook.com/profile.php?id=100093281640759") }}
                                    style={{ color: '#5fd669' }}></i>
                                <i className="fa-brands fa-square-instagram"
                                    onClick={() => { OpenUrl("https://www.instagram.com/collegecharcha?igsh=enNrajhtdXdsazRl") }}
                                    style={{ color: '#f65051' }}></i>
                                <i className="fa-brands fa-linkedin"
                                    onClick={() => { OpenUrl("https://www.facebook.com/profile.php?id=100093281640759") }}
                                    style={{ color: '#0966c2' }}></i>
                                <i className="fa-brands fa-square-youtube"
                                    onClick={() => { OpenUrl("https://youtube.com/@collegecharcha?si=8qXi96vkXKDp1ABs") }}
                                    style={{ color: '#ff0000' }}></i>
                            </div>
                        </div>
                    </div>
                    <div className='Right'>
                        <div className='Col'>
                            <h3>Useful Links</h3>
                            <ScrollLink
                                to="homeID"
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={500}
                            >Home</ScrollLink>
                            <ScrollLink
                                to="aboutID"
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={500}
                            >About us </ScrollLink>
                            <ScrollLink
                                to="aboutID"
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={500}
                            >Why us</ScrollLink>
                            <ScrollLink
                                to="ourservicesID"
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={500}
                            >Our services</ScrollLink>
                        </div>
                        {
                            (!Auth.isLogin) &&
                            <div className='Col'>
                                <h3>Account</h3>
                                <p onClick={OpenLogin}>Login</p>
                                <p onClick={OpenSignUp}>Sign up</p>
                                {/* <p>Courses</p>
                            <p>Colleges</p> */}
                            </div>
                        }
                        <div className='Col'>
                            <h3>Help Centre</h3>
                            <p>Privacy Policy</p>
                            <p>Terms</p>
                            <p>FAQ’s</p>
                            <p>Security</p>
                            <Link to='/contact'>Contact</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer