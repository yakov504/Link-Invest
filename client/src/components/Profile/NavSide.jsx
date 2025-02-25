import { useState } from "react";
import "./NavSide.css";
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { useAuth } from "../../context/AuthProvider";

import { CgProfile } from "react-icons/cg";
import { GoGraph } from "react-icons/go";
import { IoLogInOutline } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { CgAlignBottom } from "react-icons/cg";


export default function NavSide() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="nav-container">
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <ul>
          <li>
            {user.role === 'admin' ? 
            <Link to={'/Agents'}><FaPeopleGroup className="icon"/>
            {isOpen && "מבט על סוכנים"}</Link> : 
            null}
          </li>
          {
            user.role === 'admin' ?
            null :
            <li>
              <Link to={'/PersonalIndicator'}><GoGraph className="icon"/> {isOpen && "מדדים"}</Link>
            </li> 
          }
          <li onClick={() => logout()}>
            <Link to={'/'}>
              <IoLogInOutline className="icon" />
              {isOpen && "התנתק"}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
