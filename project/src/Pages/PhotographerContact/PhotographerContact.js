import React from 'react'
import Footer from '../../Components/Footer/Footer'
import './PhotographerContact.css'

import logo from '../../Assets/Logo2.png'
import profile from '../../Assets/Profile.png'
import { Link } from 'react-router-dom'

const PhotographerContact = () => {
  return (
    <div>
      <div>
        <nav className='navbar-custom'>
          <div className='logo-head'>
            <img src={logo} alt="" className='logo'/>
            <div className='logo-text'>
              <h2>ShutterShare</h2>
              <p>Future Photography</p>
            </div>
          </div>
          
          <ul>
              <li><Link to="/photographer/home" className='action'>Home</Link></li>
              <li><Link to="/photographer/contact"  className='action'>Contacts</Link></li>
              <li><Link className='action'>Notifications</Link></li>
              <Link to="/" ><button className='basic-btn' >Log Out</button></Link>
              <img src={profile} alt='' className='profile-photo'/>
              
          </ul>
        </nav>

      </div>
      <div className='row'>
        <div className='leftcolumn'>
          <div className='L-card'>
            <div className='pic'>
              <div className='circle'>
                <img src={profile} alt=''/>
              </div>
            </div>
            <h3>Photographer Name</h3>
            <p>Short Description</p>
            <p>Ratings</p>
            <p>Availability</p>
          </div>
          <div className='L-card'>
            <div className='book'>
              <button >Booking Schedule</button>
            </div>
          </div>
          <div className='L-card'>
            <h4>Messages</h4>
            <hr></hr>
            <div className='messages-tab'>

            </div>
          </div>
        </div>


        <div className='rightcolumn'>
          <div className='R-card'>
            <h2>Client Name</h2>
            <div className='message-content'>
              <div className='messages'>

              </div>
              <input type='text' name='message'/>
              <button>X</button>
            </div>
          </div>
          <div className='R-card'>
            <h2>Photos</h2>
            <div className='photo'>

            </div>
            <div className='add-upload'>
              <button>Upload Photos</button>
            </div>
          </div>
          <div className='R-card'>
            <div className='confirm-section'>
              <p>Confirmed</p>
              <p>Order Completed</p>
              <button className='complete-btn'>Complete the Order</button>
            </div>
            
            
          </div>
        </div>


      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default PhotographerContact
