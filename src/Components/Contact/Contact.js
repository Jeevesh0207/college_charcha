import React, { useState } from 'react'
import './StyleContact.css'
import Navbar from '../Navbar/Navbar'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import Loading from "../Loading/Loading"
import { useNavigate,useLocation } from 'react-router-dom'

function Contact() {
  const location = useLocation();
  const [FistName, SetFirstName] = useState("")
  const [LastName, SetLastName] = useState("")
  const [Email, SetEmail] = useState("")
  const [Course, SetCourse] = useState("")
  const [Phone, SetPhone] = useState("")
  const [Query, SetQuery] = useState("")

  const [isLoading, setisLoading] = useState(false)

  const notify = (type) => {
    switch (type) {
      case 'success':
        toast.success("Details sent successfully", {
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

  const SubmitData = async () => {
    setisLoading(true)
    const path_name=location.pathname.split('/')[2]
    const Obj = {
      FistName: FistName,
      LastName: LastName,
      Email: Email,
      Course: Course,
      Phone: Phone,
      Query: Query,
      path:(path_name===undefined)||"contact"
    }
    await axios.post(process.env.REACT_APP_URL + '/contact_us', Obj).then((res) => {
      if (res.data.is_successful) {
        // console.log(res.data)
        notify("success")
        SetFirstName("")
        SetLastName("")
        SetEmail("")
        SetCourse("")
        SetPhone("")
        SetQuery("")
      } else {
        // console.log(res.data)
        notify("err")
      }
      setisLoading(false)
    }).catch((err) => {
      notify("err")
      // console.log(err)
      setisLoading(false)
    })
  }


  return (
    <>
      <Navbar />
      <div className='Contact'>
        
        <ToastContainer />
        <div className='container'>
        {
          (isLoading) &&
          <Loading />
        }
          <div className='Head'>
            <div className='Name'>
              <h1>CONTACT US</h1>
              <span></span>
            </div>
          </div>
          <div className='Details'>
            <p>Thank you for your interest in our services. If you have any questions or concerns, please feel free to contact us. WE ARE HERE TO HELP.</p>
          </div>
          <div className='BottomContainer'>
            <div className='Left'>
              <div className='Name'>
                <div className='row FirstName'>
                  <p>First Name</p>
                  <input value={FistName} type='text' placeholder='First Name' onChange={(e) => {
                    SetFirstName(e.target.value)
                  }} />
                </div>
                <div className='row SecondName'>
                  <p>Last Name</p>
                  <input value={LastName} type='text' placeholder='Last Name' onChange={(e) => {
                    SetLastName(e.target.value)
                  }} />
                </div>
              </div>
              <div className='row Email'>
                <p>Email</p>
                <input value={Email} type='text' placeholder='Email' onChange={(e) => {
                  SetEmail(e.target.value)
                }} />
              </div>
              <div className='CoursePhone'>
                <div className='row FirstName'>
                  <p>Course</p>
                  <input value={Course} type='text' placeholder='Course' onChange={(e) => {
                    SetCourse(e.target.value)
                  }} />
                </div>
                <div className='row SecondName'>
                  <p>Phone Number</p>
                  <input value={Phone} type='text' placeholder='Phone' onChange={(e) => {
                    SetPhone(e.target.value)
                  }} />
                </div>
              </div>
              <div className='row Query'>
                <p>Comment / Query</p>
                <textarea
                  type='text'
                  placeholder='Comment'
                  onChange={(e) => {
                    SetQuery(e.target.value)
                  }}
                />
              </div>
              <div className='Btn'>
                <button onClick={SubmitData}>SUBMIT</button>
              </div>
            </div>
            <div className='Right'>
              <Player
                autoplay
                loop
                src={require('../../img/contact.json')}
                className='Lottie'
              >
                <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
              </Player>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact