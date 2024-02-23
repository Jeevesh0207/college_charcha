import React,{useState} from 'react'
// import './StyleAffilation.css'

function Affilation({AffilationData}) {
    const [isShowmore, SetisShowmore] = useState(false)
    const Show = () => {
        SetisShowmore(!isShowmore)
    }
    return (
        <div className='Affilation' id='affilationID'>
            <div className='Affilation_container'>
                <div className='Affilation_Top'>
                    <h1>Affilation</h1>
                </div>
                <div className={`para ${isShowmore ? 'expanded' : ''}`}>
                    {
                        AffilationData.map((item,index)=>(
                            <p key={index}>{item}</p>
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

export default Affilation