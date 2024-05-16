import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Assets/Logo2.png'
import './ChoosePage.css'
import Footer from '../../Components/Footer/Footer'

function ChoosePage() {
  return (
    <div className='main-area'>
        <div>
            <nav className='navbar-choose'>
                <div className='logo-head'>
                <img src={logo} alt="" className='logo'/>
                <div className='logo-text'>
                    <h2>ShutterShare</h2>
                    <p>Future Photography</p>
                </div>
                
                </div>
                
                
                <ul>
                    <li><Link to="/" className='action'>Home</Link></li>
                    <Link to="/login" ><button className='basic-btn' >Login</button></Link>
                    <Link to="/choose" ><button className='basic-btn'>Signup</button></Link>
                </ul>

                

            </nav>

        </div>
        

        <div className='choose-content'>
            <div className='choose-page'>
            <h1>Choose Side </h1>
            </div>
            <div className='line-choose'></div>
            <div className='choose-select'>
                <Link to="/photographersignup"><button className='ch-btn-ph'>Photographer</button></Link>
                <Link to="/clientsignup"><button className='ch-btn-cl'>Client</button></Link>
            </div>
        </div>
        <div>
            <Footer/>
        </div>
        
      
    </div>
  )
}

export default ChoosePage
