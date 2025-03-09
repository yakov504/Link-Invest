import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import'./NavBar.css'
import { useAuth } from '../context/AuthProvider';
import logo from '../assets/image/link_logo.png'

import { BiDownArrow } from "react-icons/bi";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function NavBar(props) {
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };
  
  return (
    <nav className={props.className}> 
      <ul>
        <li>
          { user === null ? <Link to={'/Login'}>
            איזור אישי לסוכנים</Link> : <Link to={'/AgentProfile'}>
            איזור אישי לסוכנים
          </Link> } 
        </li>
        <li> 
          <Link to='/'>עמוד הבית</Link>
        </li>
        <li onMouseEnter={handleMouseEnter} 
         onMouseLeave={handleMouseLeave} className='dropdown'>
          <Link to='/'>
            לנכסים שלנו <BiDownArrow className='navIcon' />
          </Link>
          {dropdownOpen && (
            <ul className='dropdown-menu'>
              <li>
                <Link to='/Sale'>מכירה</Link>
              </li>
              <li>
                <Link to='/Rent'>השכרה</Link>
              </li>
            </ul>
          )}
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
        <Link to='/'><img className='logo' src={logo} alt="logo" /></Link>
      </ul>
    </nav>
  )
}
