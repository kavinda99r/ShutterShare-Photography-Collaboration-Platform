import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/Logo2.png'
import Footer from '../../Components/Footer/Footer'
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            console.log(response.data);
            const { role } = response.data;
            navigate(`/${role}/home`);
            // Store token in local storage or state if needed
        } catch (error) {
            console.error(error.response.data);
            setError('Invalid username or password');
        }
    };




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
                    <Link to="/signup" ><button className='basic-btn'>Signup</button></Link>
                </ul>

                

            </nav>
      </div>
          
      <div className='signup-section'>
        <div className='signup-info'>
            <h1>Login</h1>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} className='signup-btn'>Login</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
           
      </div>

      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default LoginPage
