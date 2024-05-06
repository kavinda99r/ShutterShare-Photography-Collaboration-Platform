import React from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { Link as LinkScroll } from 'react-scroll'
import './Navbar.css'
import logo from '../../Assets/Logo2.png'


const Navbar = () => {
  
  return (
    <div>
      <nav className='navbar'>
        <div className='logo-head'>
          <img src={logo} alt="" className='logo'/>
          <div className='logo-text'>
            <h2>ShutterShare</h2>
            <p>Future Photography</p>
          </div>
          
        </div>
        
        
        <ul>
            <li><LinkScroll to="Hero" spy={true} smooth={true} offset={-100} duration={500} className='action'>Home</LinkScroll></li>
            <li><LinkScroll to="About" spy={true} smooth={true} offset={-100} duration={500} className='action'>About</LinkScroll></li>
            <li><LinkScroll to="Feature" spy={true} smooth={true} offset={-100} duration={500} className='action'>Feature</LinkScroll></li>
            <button className='basic-btn' >Login</button>
            <LinkRouter to="signup" ><button className='basic-btn'>Signup</button></LinkRouter>
        </ul>

        

      </nav>
    </div>
  )
}

export default Navbar
