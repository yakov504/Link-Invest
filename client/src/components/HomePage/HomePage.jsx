import React, { useState } from 'react'
import Footer from './Footer'
import './HomePage.css'
import agentVideo from '../../assets/video/agentsVideo.mp4'
import linkVideo from '../../assets/video/linkVideo.mp4'


export default function HomePage() {
 

  const options = [
    { verb: 'קונה', img: '' },
    { verb: 'מוכר', img: '' },
    { verb: 'משכיר', img: '' }
  ];

  const buy_sell_rent = options.map(option => (
    <div key={option.verb} className='options'>
      <img src={option.img} alt={option.verb} />
      {option.verb}
    </div>
  ));

  return (
    <div>
      <div className='header'>
        {/* <h1>LINK INVEST PRESENTS </h1> */}
        {/* <video className='video' loop autoPlay muted>
          <source src={agentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <video className='video' loop autoPlay muted>
          <source src={linkVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className='options_buy_sell'>
          {buy_sell_rent}
        </div>
      </div>
      <Footer/>
    </div>
  )
}
