import { useState } from "react";
import "./NavSide.css";
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { CgProfile } from "react-icons/cg";
import { GoGraph } from "react-icons/go";
import { IoLogInOutline } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { CgAlignBottom } from "react-icons/cg";

export default function NavSide() {
  const [isOpen, setIsOpen] = useState(true);
  const [ demo, setDemo ] = useState({name:"יעקוב יעקובוב",
     email:"yakov202.yy@gmail.com",
     phone: "0546080824",
     role:"admin"
  })

  return (
    <div className="nav-container">
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <ul>
          {/* <li>
            {demo.role === 'admin'? <Link to={'/AllIndicators'}><CgAlignBottom className="icon"/>
            {isOpen && "מבט על ממדים"}</Link> : null}
            
          </li> */}
          <li>
            <Link to={'/AgentProfile'}><CgProfile className="icon"/> {isOpen && "פרופיל"}</Link>
          </li>
          <li>
            {demo.role === 'admin'? <Link to={'/AllAgents'}><FaPeopleGroup className="icon"/>
            {isOpen && "סוכנים"}</Link> : null}
          </li>
          <li>
            <Link to={'/Indicators'}><GoGraph className="icon"/> {isOpen && "מדדים"}</Link>
          </li>
          <li>
            <Link to={'/Logout'}><IoLogInOutline className="icon"/> {isOpen && "התנתק"}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
