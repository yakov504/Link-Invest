import React, { useEffect, useState } from 'react';
import NavSide from '../NavSide'
import './Agents.css'
import { useNavigate } from "react-router-dom";
import { useAgent } from '../../../context/AgentProvider';

import { CgProfile } from "react-icons/cg";

export default function Agents() {
const { agents } = useAgent()
const [search, setSearch] = useState('');

const navigate = useNavigate()

const filteredAgents = agents.filter(agent =>
  agent.name.includes(search) || agent.email.includes(search)
);

const mapAgents = filteredAgents.map(agent => (
  <div key={agent._id} className='agentData'>
    <div className='agentDetiels'>
      <CgProfile className='iconProf'/>
      <h2>{agent.name}</h2>
      <p>{agent.email}</p>
      <p>{agent.role}</p>
      <p>{agent.phone_number}</p>
    </div>
    {/* <button>update</button> */}
    <button className='indiBtnVeiw'onClick={() => navigate("/PersonalIndicator")}>למדדי סוכן</button>
  </div>
));

return (
  <div>
    <NavSide />
    <div className='all_agents'>
      <h1>מבט על סוכנים:</h1>
      <input type="text" placeholder="חפש סוכן..." value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchBox"/>
      {filteredAgents.length === 0 ? <p>אין משתמשים</p> : <p> סה"כ משתמשים: {`${filteredAgents.length}`}</p>}
      <div className='agentCard'>
        {mapAgents}
      </div>
    </div>
  </div>
);
}