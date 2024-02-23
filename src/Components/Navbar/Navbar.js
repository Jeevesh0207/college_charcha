import React, { useEffect, useState } from 'react'
import './StyleNavbar.css'
import { Link, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { useAuth } from '../../Hook/Auth';

function Navbar() {
  const Auth = useAuth()
  const [isinHome, SetisinHome] = useState(false)
  const location = useLocation();
  const OpenMenu = () => {
    const menu_item = document.getElementsByClassName("menu-item")[0]
    const menu_icon = document.getElementById("menu-icon")
    if (menu_item.style.display === "none" || menu_item.style.display === "") {
      menu_item.style.display = "block"
      menu_icon.className = "fa-solid fa-caret-up"
    } else {
      menu_item.style.display = "none"
      menu_icon.className = "fa-solid fa-caret-down"
    }
  }

  useEffect(() => {
    if (location.pathname === '/') {
      SetisinHome(true)
    } else {
      SetisinHome(false)
    }
  }, [location.pathname])

  return (
    <div className='Navbar'>
      <div className='Left'>
        <img src={require('../../img/logo.png')} alt='png' />
      </div>
      <div className='Right'>
        <ul>
          <Link to='/'>
            <li><i className="fa-solid fa-house"></i>Home</li>
          </Link>
          {
            (isinHome) &&
            <ScrollLink
              activeClass="active"
              to="aboutID"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >

              <li><i className="fa-solid fa-user"></i>About Us</li>
            </ScrollLink>
          }
          {
            (isinHome) &&
            <ScrollLink
              activeClass="active"
              to="ourservicesID"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              <li><i className="fa-solid fa-book-open-reader"></i>Our Services</li>
            </ScrollLink>
          }
          <Link to='/' style={{
            display:"none"
          }}>
            <li><i className="fa-solid fa-book-open"></i>Courses</li>
          </Link>
          <Link to='/college'
          style={{
            display:"none"
          }}>
            <li><i className="fa-solid fa-graduation-cap"></i>Colleges</li>
          </Link>
          <Link to='/contact'>
            <li><i className="fa-solid fa-phone"></i>Contact Us</li>
          </Link>
          {
            (Auth.isLogin) &&
            <Link to='/user' style={{
              display:'flex'
            }}>
              <li><i className="fa-solid fa-user"></i>User</li>
            </Link>
          }
          <div className='menu-box' onClick={OpenMenu}>
            <i className="fa-solid fa-caret-down" id='menu-icon'></i>
            <div className='menu-item'>
              <Link to='/'>
                <p><i className="fa-solid fa-house"></i>Home</p>
              </Link>
              {
                (isinHome) &&
                <ScrollLink
                  activeClass="active"
                  to="aboutID"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >

                  <p><i className="fa-solid fa-user"></i>About Us</p>
                </ScrollLink>
              }
              {
                (isinHome) &&
                <ScrollLink
                  activeClass="active"
                  to="ourservicesID"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  <p><i className="fa-solid fa-book-open-reader"></i>Our Services</p>
                </ScrollLink>
              }
              <Link to='/' style={{
                display:'none'
              }}>
                <p><i className="fa-solid fa-book-open"></i>Courses</p>
              </Link>
              <Link to='/college'
              style={{
                display:'none'
              }}>
                <p><i className="fa-solid fa-graduation-cap"></i>Colleges</p>
              </Link>
              <Link to='/contact'>
                <p><i className="fa-solid fa-phone"></i>Contact Us</p>
              </Link>
            </div>
          </div>
        </ul>

      </div>
    </div>
  )
}

export default Navbar