import React from 'react';
import './HomePage.css'
import logo from '../../assets/image/link_logo.png'

export default function Footer () {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src={logo} alt="LINK_INVEST" />
      </div>
      <ul className="footer__nav">
        <li><a href="#">About us</a></li>
        <li><a href="#">Download apps</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <p className="footer__copyright">
        &copy; by Yakov Y. All rights reserved.
      </p>
    </footer>
  );
}


