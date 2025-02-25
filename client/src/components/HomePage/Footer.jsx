import React from 'react';
import './HomePage.css'
import { Link } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FaPhone } from "react-icons/fa";

import logo from '../../assets/image/link_logo.png'

export default function Footer () {
  const scrollToSection = (className) => {
    const section = document.querySelector(`.${className}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src={logo} alt="LINK_INVEST" />
      </div>
      <ul className="footer__nav">
        <li><Link to="/" onClick={() => scrollToSection('whoWeAre')}>מי אנחנו</Link></li>
        <li><a href="/BuySellRent">להשארת פרטים</a></li>
        <li><a href="tel:+972528000284"><FaPhone/></a></li>
        <li> 
          <a href="https://api.whatsapp.com/send/?phone=528000284&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          </a>
        </li> 
        <li> 
          <a href="https://www.instagram.com/linkinvests/" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </a>
        </li> 
      </ul>
      <p className="footer__copyright">
        &copy; by Yakov Y. All rights reserved.
      </p>
    </footer>
  );
}


