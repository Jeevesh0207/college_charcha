import React, { useState, useEffect } from 'react'
import './StyleMeetExpert.css'

function MeetExpert() {


    return (
        <div className='MeetExpert'>
                <div className='Head'>
                    <div className='Name'>
                        <h1>MEET OUR EXPERTS</h1>
                        <span></span>
                    </div>
                </div>
                <div className='info'>
                    <p>We take immense pride in our accomplishments and eagerly anticipate sustaining our commitment to delivering top-notch services, aiming to solidify our position as one of the premier educational consulting organizations in our nation. Our team comprises seasoned and qualified professionals with expertise spanning major verticals of the service industry.</p>
                </div>
                <div className='Mid'>
                    <div className='Box'>
                        <div className='Box-banner'>
                            <img src={require('../../img/Meetourexperts/mona.png')} alt='png' />
                        </div>
                        <div className='Box-details'>
                            <h3>Mona Yadav</h3>
                            <p>Senior Academic Counselor</p>
                        </div>
                    </div>
                    <div className='Box'>
                        <div className='Box-banner'>
                            <img src={require('../../img/Meetourexperts/tanishka.png')} alt='png' />
                        </div>
                        <div className='Box-details'>
                            <h3>Tanishka Nagar</h3>
                            <p>Academic Counselor</p>
                        </div>
                    </div>
                    <div className='Box'>
                        <div className='Box-banner'>
                            <img src={require('../../img/Meetourexperts/diksha.png')} alt='png' />
                        </div>
                        <div className='Box-details'>
                            <h3>Diksha Singh</h3>
                            <p>Senior Academic Counselor</p>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default MeetExpert