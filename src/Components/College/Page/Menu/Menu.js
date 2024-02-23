import React from 'react'
import './StyleMenu.css'
import { Link as ScrollLink } from 'react-scroll'

function Menu() {
  return (
    <div className='Menu'>
      <ul>
        <ScrollLink
          to='summaryID'
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          <li className='active'>College Info</li>
        </ScrollLink>
        <ScrollLink
          to='affilationID'
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          <li>Affilation</li>
        </ScrollLink >
        <ScrollLink
          to='youtubeID'
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          <li>Youtube Link</li>
        </ScrollLink>
        <ScrollLink
          to='admissionID'
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          <li>Admission Procedure</li>
        </ScrollLink>
        <ScrollLink
          to='coursesID'
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          <li>Courses</li>
        </ScrollLink>
        <ScrollLink
          to='scholarshipID'
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          <li>Scholarship</li>
        </ScrollLink>
        <ScrollLink
          to='placementID'
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          <li>Placement</li>
        </ScrollLink>
        <ScrollLink
          to='faqID'
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          <li>FAQ</li>
        </ScrollLink>
      </ul>
    </div>
  )
}

export default Menu