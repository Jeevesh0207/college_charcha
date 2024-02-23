import React, { useState, useEffect } from 'react'
import './StyleAbout.css'

function About() {

    return (
        <div className='About' id='aboutID'>
            <div className='MaxBox'>
                <div className='Head'>
                    <div className='Name'>
                        <h1>ABOUT US</h1>
                        <span></span>
                    </div>
                </div>
                <div className='container'>
                    <div className='info'>
                        <p>College Charcha, operating under the umbrella of HB Counseling Services, stands as a distinguished educational consulting entity with a legacy spanning 14 years. Our core offerings encompass comprehensive Career Guidance, Educational Counseling, and preparation for Group Discussions (GD), Personal Interviews (PI), and various entrance exams. Our primary objective is to furnish precise information across all academic disciplines.</p>
                        <p>Adopting a consultative paradigm, our approach revolves around aiding and discerning students in selecting the most fitting institutions or universities to pave the way for a promising future. College Charcha is committed to delivering authentic insights into educational institutions and universities, catering to the needs of the student populace.</p>
                        <p>Founded in 2014, College Charcha has played a pivotal role in providing consulting services to a diverse array of colleges and universities. Our track record includes establishing preferred business partnerships with select educational institutions, earning us a reputation for excellence.</p>
                    </div>
                    <div className='Mid'>
                        <div className='Box'>
                            <div className='Box-banner'>
                                <img src={require('../../img/Founder/biman.png')} alt='png' />
                            </div>
                            <div className='Box-details'>
                                <h3>MR. BIMAN MONDAL</h3>
                                <h3>(Founder)</h3>
                                <p>Mr. Biman has been associated and been working in the educaton industry for more than 15 years now</p>
                            </div>
                        </div>
                        <div className='Box'>
                            <div className='Box-banner'>
                                <img src={require('../../img/Founder/hitesh.png')} alt='png' />
                            </div>
                            <div className='Box-details'>
                                <h3>MR. HITESH KUMAR</h3>
                                <h3>(Founder)</h3>
                                <p>Mr. Hitesh has been associated and been working in the educaton industry for more than 13 years now</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About