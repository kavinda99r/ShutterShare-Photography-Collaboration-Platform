import React from 'react'
import './ConfirmPopup.css'

const ConfirmPopup = (props) => {
  return (props.trigger) ? (
    <div className='popup'>
      <div id='popupinner' className='open'>
        <button id='close-btn' onClick={()=>props.setTrigger(false)}>X</button>
        {props.children}
      </div>
    </div>
  ): "";
}

export default ConfirmPopup
