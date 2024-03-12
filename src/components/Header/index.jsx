import React from 'react'
import './style.css'
import logo from '../../assets/logo.png'
const Header = () => {


  return (
    <div className='header'>
      <div className='logo-box'>
        <img src={logo} alt='brand-logo'/>
        <span className='logo-name'>Audius</span>
      </div>
    </div>
  )
}

export default Header
