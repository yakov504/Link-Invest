import React, { useEffect, useState } from 'react';
import NavSide from '../NavSide'
import { useNavigate } from "react-router-dom";
import { useAgent } from '../../../context/AgentProvider';

export default function Agents() {
const { agents } = useAgent()

// console.log('agents state:',agents);

const mapAgents = agents.map(agent => (
  <div key={agent._id} className='agentData'>
    <h2>{agent.name}</h2>
    <p>{agent.email}</p>
    <p>{agent.role}</p>
    <p>{agent.phone_number}</p>
    <button>delete</button>
    <button>update</button>
    <button>indicator</button>
  </div>
));

return (
    <div>
      <NavSide />
      <h1>All Agents</h1>
      {agents.length === 0 ? <p>אין משתמשים</p> : <p> סה"כ משתמשים: {`${agents.length}`}</p>}
      {mapAgents}
    </div>
);
}