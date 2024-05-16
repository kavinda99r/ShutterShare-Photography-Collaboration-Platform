import React from 'react'
import { useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import ConfirmPopup from '../../Components/ConfirmPopup/ConfirmPopup'

import logo from '../../Assets/Logo2.png'
import profile from '../../Assets/Profile.png'
import { Link } from 'react-router-dom'


const ClientContact = () => {

  const [buttonPopup, setButtonPopup] = useState(false);

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
              <li><Link to="/client/home" className='action'>Home</Link></li>
              <li><Link to="/client/contact"  className='action'>Contacts</Link></li>
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
            <h3>Client Name</h3>
          </div>
          <div className='L-card'>
            <div className='book'>
              <button >Booking Now</button>
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
            <h2>Photographer Name</h2>
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
              <button>Select Best Photos</button>
              <button onClick={()=>setButtonPopup(true)}>Confirm</button>
              
            </div>
            <ConfirmPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <div className='confirm-popup'>
                  <h2>Confirmation</h2>
                  <p>Ratings</p>
                  <p>********</p>
                  <p>Add Comment</p>
                  <textarea rows={4}/>
                  <button>Confirm</button>
                </div>
              </ConfirmPopup>
          </div>
          <div className='R-card'>
            <div className='confirm-section'>
              <p>Confirmed</p>
              <p>Order Completed</p>
              <button className='complete-btn'>Contact Again</button>
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

export default ClientContact
