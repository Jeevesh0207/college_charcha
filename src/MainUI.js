import React, { useState, useEffect } from 'react'
import { About, Home, Login, MeetExpert, OurServices, SignUp,Forgot,Stats, Footer } from './Components'
import './StyleMainUI.css'

function MainUI() {
  const [isPageLogin, setisPageLogin] = useState(false)
  const [isPageSignUp, setisPageSignUp] = useState(false)
  const [isPageForgot,setisPageForgot]=useState(false)
  const handleClosePopup = () => {
    setisPageLogin(false);
    setisPageSignUp(false);
    setisPageForgot(false)
  };
  return (
    <div className='MainUI'>
      <Home setisPageLogin={setisPageLogin} setisPageSignUp={setisPageSignUp} />
      <About/>
      <MeetExpert/>
      <OurServices /> 
      <Stats/>
      <Footer setisPageLogin={setisPageLogin} setisPageSignUp={setisPageSignUp}/>

      {isPageLogin && <Login setisPageForgot={setisPageForgot} setisPageLogin={setisPageLogin} setisPageSignUp={setisPageSignUp} onClose={handleClosePopup} />}
      {isPageSignUp && <SignUp  setisPageLogin={setisPageLogin} setisPageSignUp={setisPageSignUp} onClose={handleClosePopup} />}

      {isPageForgot&& <Forgot setisPageForgot={setisPageForgot} setisPageLogin={setisPageLogin} onClose={handleClosePopup} />}
    
    </div>
  )
}

export default MainUI