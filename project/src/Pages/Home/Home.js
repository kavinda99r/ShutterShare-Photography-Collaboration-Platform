import React from 'react'
import { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Hero from '../../Components/Hero/Hero'
import About from '../../Components/About/About'
import Choose from '../../Components/Choose/Choose'
import Feature from '../../Components/Feature/Feature'
import Contact from '../../Components/Contact/Contact'
import Footer from '../../Components/Footer/Footer'

const Home = () => {

 

  return (
    <>
    <div>
      <Navbar/>
      <Hero/>
      <Choose/>
      <About/>
      <Feature/>
      <Footer/>
    </div>
    </>
  )
}

export default Home
