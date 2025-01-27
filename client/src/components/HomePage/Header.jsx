import React from 'react'
import './HomePage.css'
import agentVideo from '../../assets/video/agentsVideo.mp4'
import linkVideo from '../../assets/video/linkVideo.mp4'


export default function Header() {
  return (
    <div className='header'>
      <video className='video' loop autoPlay muted>
        <source src={agentVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <video className='video' loop autoPlay muted>
        <source src={linkVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <h2>LINK INVEST - <br />שיווק, קנייה ומכירת נדל"ן</h2>
    </div>
  )
}
