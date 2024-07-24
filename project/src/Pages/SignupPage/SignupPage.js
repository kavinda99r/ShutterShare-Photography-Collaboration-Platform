import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/Logo2.png';
import Footer from '../../Components/Footer/Footer';
import './SignupPage.css';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); 
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!username || !email || !password || !role) {
            setError('Please fill all the fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/signup', { username, email, password, role });
            console.log(response.data);
            if (role === 'client') {
                navigate('/client/home');
            } else if (role === 'photographer') {
                navigate('/photographer/home');
            }
        } catch (error) {
            console.error(error.response.data);
            setError(error.response.data.message);
        }
    };

    return (
        <div className='signup-background'>
            <div>
                <nav className='navbar-choose'>
                    <div className='logo-head'>
                        <img src={logo} alt="" className='logo' />
                        <div className='logo-text'>
                            <h2>ShutterShare</h2>
                            <p>Future Photography</p>
                        </div>
                    </div>
                    <ul>
                        <li><Link to="/" className='action'>Home</Link></li>
                        <Link to="/login"><button className='basic-btn'>Login</button></Link>
                        <Link to="/signup"><button className='basic-btn'>Signup</button></Link>
                    </ul>
                </nav>
            </div>
            <div className='signup-section'>
                <div className='signup-info'>
                    <h1>Sign Up</h1>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <select 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                        className='select-option'
                    >
                        <option value="" disabled selected>Choose role</option>
                        <option value="client">Client</option>
                        <option value="photographer">Photographer</option>
                    </select>
                    <button onClick={handleSignup} className='signup-btn'>Sign up</button>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default SignupPage;
