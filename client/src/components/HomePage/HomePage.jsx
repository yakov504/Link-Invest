import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import './HomePage.css'

import sell from '../../assets/image/sell.jpg'
import buy from '../../assets/image/buy1.jpg'
import rent from '../../assets/image/rent.jpg'
import agentVideo from '../../assets/video/agentsVideo.mp4'
import linkVideo from '../../assets/video/linkVideo.mp4'


export default function HomePage() {
 const navigate = useNavigate()

  const options = [
    { verb: 'קונה', img:buy },
    { verb: 'משכיר',img:rent },
    { verb: 'מוכר', img:sell}

  ];

  const buy_sell_rent = options.map(option => (
    <div key={option.verb} className='options'>
      <img src={option.img} alt={option.verb} />
      <h2 onClick={() => navigate('/BuySellRent')}>{option.verb}</h2>
    </div>
  ));

  return (
    <div>
      <div className='header'>
    
        <video className='video' loop autoPlay muted>
          <source src={linkVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <div className="video-overlay">
          <h1>LINK INVEST</h1>
          <h2>מציגים...</h2>
        </div> */}
        <div className='options_buy_sell'>
          {buy_sell_rent}
        </div>
        <div className='whoWeAre'>
          <div className='whoText'>
            <h2>?WHO WE ARE</h2>
            <div class="company-intro">
              <p>
                <span class="highlight">אנחנו חברת לינק!</span><br />
                מומחים בתיווך נכסים, מחויבים להפוך את חלום הבית שלכם למציאות. 
              </p>
              <p>
                צוות סוכני הנדל"ן המנוסים שלנו ימצא עבורכם את הנכס המושלם,
                <br /> 
                בין אם זהו הבית הראשון שלכם או בית חלומותיכם.אנו נלווה אתכם לאורך
                <br />
                 כל שלבי התהליך – 
                <strong>מטיפול בניירת ועד ניהול משא ומתן</strong> – כדי להבטיח חוויה חלקה ומהנה.
              </p>
              {/* <p>
                <strong>למה לבחור בנו?</strong>
                <ul>
                  <li>מחויבות לשקיפות וליושר.</li>
                  <li>עדכונים שוטפים לאורך כל הדרך.</li>
                  <li>הבנה עמוקה של הצרכים וההעדפות שלכם.</li>
                </ul>
              </p> */}
              <p>
                <strong>צרו קשר עוד היום</strong> או בקרו במשרדינו. נשמח לעזור לכם למצוא את בית חלומותיכם! 
              </p>
              {/* <button className='contactBtn'> צור איתנו קשר!</button> */}
            </div>
          </div>
          <video className='agentsVideo' loop autoPlay muted>
            <source src={agentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
