import Footer from "../../Components/Footer/Footer"
import PGdetails from "../../Components/PhotographerDetails/Photographerdetails"
import FilterComponent from "../../Components/Filter/Filter"
import SearchPG from "../../Components/SearchPhotographer/Searchphotographer"

import logo from '../../Assets/Logo2.png'
import profile from '../../Assets/Profile.png'
import { Link } from 'react-router-dom'


const ClientHome = () => {
    return (
        <>
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

            <SearchPG/>
            <FilterComponent/>
            <PGdetails/>
            <Footer/>  

        </div>
            
            
        
        </>
    )
}
export default ClientHome