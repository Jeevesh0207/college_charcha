import React from 'react'
import './StyleOurServices.css'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'

function OurServices() {
    const Navigate=useNavigate()
    const SendToPage=(path)=>{
        Navigate('/contact/'+path)
    }

    return (
        <>
            <div className='OurServices' id='ourservicesID'>
                <div className='Head'>
                    <div className='Name'>
                        <h1>OUR SERVICES</h1>
                        <span></span>
                    </div>
                </div>
                <div className='Mid'>
                    <div className='Box'>
                        <div className='Box-banner'>
                            <img src={require('../../img/OurServices/1.png')} alt='png' />
                        </div>
                        <div className='Box-details'>
                            <h3>Career Counsling</h3>
                            <p>Our seasoned professionals provide personalized guidance to help you make informed to help you make informed decisions about your academic and professionall journey. Discover the path to a successful and fulfilling career.</p>
                        </div>
                        <div className='Box-btn'>
                            <button onClick={()=>{
                                SendToPage('career_counsling')
                            }}>Get</button>
                        </div>
                    </div>
                    <div className='Box'>
                        <div className='Box-banner'>
                            <img src={require('../../img/OurServices/2.png')} alt='png' />
                        </div>
                        <div className='Box-details'>
                            <h3>Education Counsling</h3>
                            <p>Our experienced team offers tailored guidance to assist you in making well-informed decision about your educational path. navigate the world of academia with confidence and clarity.</p>
                        </div>
                        <div className='Box-btn'>
                            <button onClick={()=>{
                                SendToPage("education_counsling")
                            }}>Get</button>
                        </div>
                    </div>
                    <div className='Box'>
                        <div className='Box-banner'>
                            <img src={require('../../img/OurServices/3.png')} alt='png' />
                        </div>
                        <div className='Box-details'>
                            <h3>GD-PI & Entrance Exams</h3>
                            <p>Our seasoned experts offers tailored guidance to enhance your skills, ensuring your shine in group discussions,perform well in interviews, and excel in various entrance exam. Elevate your prepration with our focused Counselling support.</p>
                        </div>
                        <div className='Box-btn'>
                            <button onClick={()=>{
                                SendToPage("entrance_exams")
                            }}>Get</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OurServices