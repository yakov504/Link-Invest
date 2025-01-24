import React from 'react'
import './HomePage.css'
import logo from '../../assets/image/link_logo.png'
import nadlan1 from '../../assets/image/nadlan2.jpg'
import yam from '../../assets/image/yam_LE_upscale_balanced_x4.jpg'


export default function Header() {
  return (
    <div >
      <div className='header'>
        <img className='yam' src={yam} alt="logo" />
        {/* <img className='logo' src={logo} alt="logo" /> */}
        <h2>LINK INVEST - <br />שיווק, קנייה ומכירת נדל"ן</h2>
        {/* <img className='nadlan' src={nadlan1} alt="nadlan" /> */}
      </div>
    </div>
  )
}
