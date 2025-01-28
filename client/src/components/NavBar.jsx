import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import'./NavBar.css'
import logo from '../assets/image/link_logo.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function NavBar(props) {

  return (
    <nav className={props.className}> 
      <ul>
        <li> 
          <Link to='/Login'>איזור אישי לסוכנים</Link> 
        </li> 
        <li> 
          <Link to='/HomePage'>עמוד הבית</Link>
        </li> 
      </ul>
      <ul className='icons'>
        <li>
          <a href="https://www.facebook.com/profile.php?id=100091821998393&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
            <FacebookIcon />
          </a>
        </li>
        <li> 
          <a href="https://www.instagram.com/linkinvests/" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </a>
        </li> 
        <li> 
          <a href="https://api.whatsapp.com/send/?phone=528000284&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
          </a>
        </li> 
        <Link to='/HomePage'><img className='logo' src={logo} alt="logo" /></Link>
      </ul>
    </nav>
  )
}
