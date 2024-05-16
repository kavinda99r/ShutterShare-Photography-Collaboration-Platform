import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Assets/Logo2.png'
import Footer from '../../Components/Footer/Footer'

const LoginPage = () => {
  return (
    <div className='signup-background'>
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
          
      <div className='signup-section'>
        <div className='signup-info'>
            <h1>Login</h1>
            <div className='line-choose-signup'></div>
            <input type='text' placeholder='Enter Username'/>
            <input type='password' placeholder='Enter Password' />
            <button className='signup-btn'>Login</button>
            <p>Don't have an account. <Link to="/choose" className='link-login'>Sign up</Link></p>
        </div>
           
      </div>

      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default LoginPage
