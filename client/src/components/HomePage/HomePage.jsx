import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import BuySellRent from './BuySellRent'
import './HomePage.css'

import haifaN from '../../assets/image/haifaNghit.jpg'
import sell from '../../assets/image/IMG_8928.jpg'
import agentVideo from '../../assets/video/agentsVideo.mp4'
import linkVideo from '../../assets/video/link-vid13sc.mp4'

import { FaHandshake } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { FaPersonRays } from "react-icons/fa6";

export default function HomePage() {
 const navigate = useNavigate()

  const options = [
    { verb: 'רוצים שניצור אתכם קשר, לחצו כאן ', img:sell}

  ];

  const buy_sell_rent = options.map(option => (
    <div key={option.verb} className='options'>
      <img src={option.img} alt={option.verb} 
        onClick={() => navigate('/BuySellRent')}/>
      <h2 onClick={() => navigate('/BuySellRent')}>{option.verb}</h2>
    </div>
  ));
  // const reasons = [
  //   {reason: " ות וטכנולוגיה מתקדמת – אנו מנצלים את הכלים הטכנולוגיים המתקדמים ביותר לניתוח שוק מדויק, שמביא לכם את העסקאות הטובות ביותר", icon:<FaHandshake/>},
  //   {reason: 'תמיכה וליווי עד הסיום – מהייעוץ הראשוני ועד לחתימת העסקה – אנחנו שם בשבילכם בכל שלב ובכל שאלה', icon:<GrUpdate/>},
  //   {reason: 'ניסיון עשיר ואמינות מוכחת – שנים של הצלחות בתחום הנד"ן מבטיחות לכם ליווי מקצועי שמבוסס על ניסיון עמוק ושקיפות מלאה', icon:<FaPersonRays/>},
  // ];

  const reasons = [
    {reason: "מחויבות לשקיפות וליושר", icon:<FaHandshake/>},
    {reason: 'עדכונים שוטפים לאורך כל הדרך', icon:<GrUpdate/>},
    {reason: "הבנה עמוקה של הצרכים וההעדפות שלכם", icon:<FaPersonRays/>},
  ];
//   ות וטכנולוגיה מתקדמת – אנו מנצלים את הכלים הטכנולוגיים המתקדמים ביותר לניתוח שוק מדויק, שמביא לכם את העסקאות הטובות ביותר
// תמיכה וליווי עד הסיום – מהייעוץ הראשוני ועד לחתימת העסקה – אנחנו שם בשבילכם בכל שלב ובכל שאלה
// אורן גלילי
// 14:40
// ניסיון עשיר ואמינות מוכחת – שנים של הצלחות בתחום הנדל"ן מבטיחות לכם ליווי מקצועי שמבוסס על ניסיון עמוק ושקיפות מלאה

  const reasonsMap = reasons.map(reason => (
    <div key={reason.reason} className='reasons'>
      <h4>{reason.icon}</h4>
      <p>{reason.reason}</p>
    </div>
  ))

  const services = [
    {service: "מכירת נכסים", paragragh:"ייעוץ וליווי אישי בתהליך מכירת הנכס ומציאת הנכס הבא שלך"},
    {service: "ליווי משקיעים", paragragh:"השקעה לטווח ארוך ? השקעה לטווח קצר ? תנו ליועצים שלנו לעשות עבורך את העבודה."},
    {service: 'יעוץ משכנתאות ', paragragh:"תנו לנו להוביל אתכם לעבר הבית הבא עם ייעוץ משכנתא שמשלב חדשנות, יחס אישי ושירות ייחודיי."},
    {service: 'שיווק פרויקטים' , paragragh:'הקמת משרדי מכירות. גיוס והכשרת אנשי נדל"ן מותאמים לפי צרכי היזם.'},
    {service: ' הכשרת סוכני נדל"ן ', paragragh:'הצטרף לקורס ההכשרה הייחודי שלנו לסוכני נדל"ן, וגלה סודות מעשיים וטכניקות מוכחות שיהפכו כל עסקה להזדמנות מנצחת', },

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
          <h1>WELCOME TO YOUR</h1>
          <h2>NEW HOME</h2>
        </div>
        <div className='whoWeAre'>
          <div className='whoText'>
            <h2>WHO WE ARE</h2>
            <div className="company-intro">
              <p>
                <span className="highlight">אנחנו חברת לינק!</span><br />
                מומחים בתיווך נכסים, מחויבים להפוך את חלום הבית שלכם למציאות. 
                <br /> 
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
        <h3 className='whyWeH'>למה לינק</h3>
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
        <div className='liveDitails'>
          <div className='options_buy_sell'>
            {buy_sell_rent}
          </div>
          {/* <BuySellRent/> */}
          {/* <Carousel/> */}
        </div>
      </div>
      <Footer/>
    </div>
  )
}
