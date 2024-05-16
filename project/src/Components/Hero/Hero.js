import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='hero container' id='Hero'>
      <div className='hero-text'>
        <h1 className='hero-head'>ShutterShare</h1>
        <p className='hero-para'>Experience the epitome of photography networking on our 
          platform and elevate your craft and 
          expand your reach with our unparalleled 
          networking opportunities.</p>
        <Link to="/choose"><button className='hero-btn'><p>Get Started</p></button></Link>
      </div>
      
    </div>
  )
}

export default Hero
