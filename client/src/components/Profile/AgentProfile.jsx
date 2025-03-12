import "./Profile.css";
import NavSide from "./NavSide";
import { useAuth } from "../../context/AuthProvider";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CiMail } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoIosPhonePortrait } from "react-icons/io";
import { FaPersonCircleQuestion } from "react-icons/fa6";


export default function AgentProfile() {
  const { user } = useAuth();
  const navigate = useNavigate()

  if (!user) return <p>יש להתחבר כדי לצפות בפרופיל</p>;

  return (
    <div className="agentProfile">
      <NavSide/>
      <h1>ברוכים הבאים, {user.name}!</h1>
      <div className="userData">
        <CgProfile className="profIcon"/>
        <p><CiMail className="icon"/> <span>{user.email}</span></p>
        <p><IoIosPhonePortrait className="icon"/> <span>{user.phone_number}</span></p>
        <p><FaPersonCircleQuestion className="icon"/> <span>{user.role}</span></p>
        <button onClick={() => navigate("/DailyIndicator")}>הכנס סטטוס יומי</button>
      </div>
    </div>
  );
}