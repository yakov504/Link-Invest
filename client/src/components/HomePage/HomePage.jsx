import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import './HomePage.css'

import haifaN from '../../assets/image/haifaNghit.jpg'
// import sell from '../../assets/image/sell.jpg'
import sell from '../../assets/image/IMG_8928.jpg'

// import buy from '../../assets/image/buy1.jpg'
import buy from '../../assets/image/link-3-twr.jpg'

// import rent from '../../assets/image/rent.jpg'
import rent from '../../assets/image/link-tawer.jpg'

import agentVideo from '../../assets/video/agentsVideo.mp4'
// import linkVideo from '../../assets/video/link-vid-nologo.mp4'
import linkVideo from '../../assets/video/link-vid13sc.mp4'


import { FaHandshake } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { FaPersonRays } from "react-icons/fa6";

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

  const reasons = [
    {reason: "מחויבות לשקיפות וליושר", icon:<FaHandshake/>},
    {reason: 'עדכונים שוטפים לאורך כל הדרך', icon:<GrUpdate/>},
    {reason: "הבנה עמוקה של הצרכים וההעדפות שלכם", icon:<FaPersonRays/>},
  ];

  const reasonsMap = reasons.map(reason => (
    <div key={reason.reason} className='reasons'>
      <h4>{reason.icon}</h4>
      <p>{reason.reason}</p>
    </div>
  ))

  const services = [
    {service: "מכירת נכסים", paragragh:"ייעוץ וליווי אישי בתהליך מכירת הנכס ומציאת הנכס הבא שלך",icon:<FaHandshake/>},
    {service: "ליווי משקיעים", paragragh:"השקעה לטווח ארוך ? השקעה לטווח קצר ? תנו ליועצים שלנו לעשות עבורך את העבודה.", icon:<GrUpdate/>},
    {service: 'נדל"ן מסחרי' , paragragh:"מקסמו את הרווחים שלכם ומזערו את הסיכונים עם הנחיות מדויקות בעולם המסחרי.", icon:<FaPersonRays/>},
    {service: 'שיווק פרויקטים' , paragragh:'הקמת משרדי מכירות. גיוס והכשרת אנשי נדל"ן מותאמים לפי צרכי היזם.', icon:<FaPersonRays/>},
    {service: 'התחדשות עירונית (פינוי בינוי)', paragragh:"העתיד כבר כאן. החתמת דיירים ליזמים. שיתופי פעולה עם קבלנים וותיקים ומובילים.", icon:<FaPersonRays/>},

  ];

  const servicesMap = services.map(service => (
    <div key={service.service} className='service'>
      <h4>{service.service}</h4>
      <p>{service.paragragh}</p>
    </div>
  ))

  return (
    <div>
      <div className='header'>
        <video className='video' loop autoPlay muted>
          <source src={linkVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className='welcomeH'>
          <h1>WELCOME TO THE</h1>
          {/* <h3></h3> */}
          <h2>NEW FUTURE</h2>
        </div>
        <div className='options_buy_sell'>
          {buy_sell_rent}
        </div>
        <div className='whoWeAre'>
          <div className='whoText'>
            <h2>WHO WE ARE</h2>
            {/* <h2>מי אנחנו</h2> */}
            <div className="company-intro">
              <p>
                <span className="highlight">אנחנו חברת לינק!</span><br />
                מומחים בתיווך נכסים, מחויבים להפוך את חלום הבית שלכם למציאות. 
                <br /> 
              {/* </p>
              <p> */}
                צוות סוכני הנדל"ן המנוסים שלנו ימצא עבורכם את הנכס המושלם,
                <br /> 
                בין אם זהו הבית הראשון שלכם או בית חלומותיכם.אנו נלווה אתכם לאורך
                <br />
                 כל שלבי התהליך – 
                <strong>מטיפול בניירת ועד ניהול משא ומתן</strong> – כדי להבטיח חוויה חלקה ומהנה.
              </p>
              <p>
                <strong>צרו קשר עוד היום</strong> או בקרו במשרדינו. נשמח לעזור לכם למצוא את בית חלומותיכם! 
              </p>
              <button className='contactBtn' 
                 onClick={() => window.location.href = 'tel:+972528000284'}>
                 צור איתנו קשר!</button>
            </div>
          </div>
          <video className='agentsVideo' loop autoPlay muted>
            <source src={agentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <h3 className='whyWeH'>למה לבחור בנו?</h3>
        <div className='whyW'>
          {reasonsMap}
        </div>
        <div className='offers'>
          <img src= {haifaN} alt="haifanohjt" />
        </div>
        <div className='services-conteiner'>
          <h3>השירותים שלנו</h3>
          <div className='services'>
           {servicesMap}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
