import React, { useState } from 'react'
import './StyleSummary.css'

function Summary({ SummaryData }) {
    const [isShowmore, SetisShowmore] = useState(false)
    const Show = () => {
        SetisShowmore(!isShowmore)
    }
    return (
        <div className='Summary' id='summaryID'>
            <div className='Summary_container'>
                <div className='Summary_Top'>
                    <h1>Overview</h1>
                </div>
                <div className={`para ${isShowmore ? 'expanded' : ''}`}>
                    {
                        SummaryData.map((item, id) => (
                            <p key={id}>{item}</p>
                        ))
                    }
                </div>
                <div className='Show'>
                    {
                        (!isShowmore) &&
                        <div className='shadow'></div>
                    }
                    <span onClick={Show}>{(isShowmore) ? 'Show Less' : 'Show more..'}</span>
                </div>
            </div>
        </div>
    )
}

export default Summary