import React from 'react'
import './StyleBanner.css'
import Img from '../../../../img/1.webp'

function Banner({ BasicData }) {

  const OpenUrl = (link) => {
    let newTab = window.open();
    newTab.opener = null;
    newTab.location = link;
    newTab.rel = 'noopener noreferrer';
  }

  return (
    <div className='Banner'
      style={{
        backgroundImage: `
        url(${BasicData.bannerImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
      }}
    >
      <div className='Banner_Layer'>
        <div className='Banner_Poster'>
          <div className='Top'>
            <div className='Left'>
              <img src={BasicData.logoImage} ></img>
              {/* <img src={BasicData.logoImage} alt='png'></img> */}
            </div>
            <div className='Right'>
              <h1>{BasicData.Name} Admission 2024, Cutoff, Placements, Fees, Courses, Ranking</h1>
            </div>
          </div>
          <div className='Key_Point'>
            <span><i className="fa-solid fa-building-columns"></i>Estd : {BasicData.Estd}</span>
            <span><i className="fa-solid fa-meteor"></i>NAAC : {BasicData.NAAC}</span>
            <span onClick={()=>{
              OpenUrl(BasicData.LocationLink)
            }}
            style={{
              cursor:'pointer'
            }}
            ><i className="fa-solid fa-location-dot"></i>{BasicData.State}, {BasicData.Country}</span>

          </div>
          <div className='Key_Point'>
            <span><i className="fa-solid fa-ranking-star"></i>Review : {BasicData.Rating}/5</span>
            <span><i className="fa-solid fa-phone"></i>+91 {BasicData.Phone}</span>
            <span><i className="fa-solid fa-envelope"></i>{BasicData.Email}</span>
          </div>
          {/* <div className='Key_Point'>
            <span>Ranked 12th in top universities</span>
          </div> */}
          <div className='Banner_Btn'>
            <button onClick={()=>{
              OpenUrl(BasicData.Website)
            }}><i className="fa-solid fa-link"></i>Website</button>
            <button onClick={()=>{
              OpenUrl(BasicData.Broucher)
            }}><i className="fa-solid fa-bookmark"></i>Download Broucher</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner