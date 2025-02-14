import "./Profile.css";
import { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoIosPhonePortrait } from "react-icons/io";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import NavSide from "./NavSide";

export default function AgentProfile() {
  const { user } = useAuth();
  // const [ demo, setDemo ] = useState({name:"יעקוב יעקובוב",
  //    email:"yakov202.yy@gmail.com",
  //    phone: "0546080824",
  //    role:"admin"
  // })

  // const logout = () => {
  //   setDemo(null); 
  // };

  if (!user) return <p>יש להתחבר כדי לצפות בפרופיל</p>;

  return (
    <div className="agentProfile">
      <NavSide/>
      <h1>ברוכים הבאים, {user.name}!</h1>
      <div className="userData">
        <CgProfile className="profIcon"/>
        <p><CiMail className="icon"/> <span>{user.email}</span></p>
        <p><IoIosPhonePortrait className="icon"/> <span>{user.phone}</span></p>
        <p><FaPersonCircleQuestion className="icon"/> <span>{user.role}</span></p>
        {/* <button onClick={logout}>התנתק</button> */}
      </div>
    </div>
  );
}