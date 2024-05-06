import React from 'react'
import './Choose.css'


const Choose = () => {
  return (
    <div className='choose container'>
      <div className='choose-head'>
        <h1>Choose Side </h1>
      </div>
      <div className='line-choose'></div>
      <div className='choose-select'>
          <button className='ch-btn-ph'>Photographer</button>
          <button className='ch-btn-cl'>Client</button>
      </div>
      
    </div>
  )
}

export default Choose
