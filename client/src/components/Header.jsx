import React from 'react'
import NavBar from './Navbar'
import '../App.css'
import logo from '../assets/image/link_logo.png'
import nadlan1 from '../assets/image/nadlan2.jpg'

export default function Header() {
  return (
    <div >
      <NavBar/>
      <div className='header'>
        <img className='logo' src={logo} alt="logo" />
        <h2>LINK INVEST - <br />שיווק, קנייה ומכירת נדל"ן</h2>
        <img className='nadlan' src={nadlan1} alt="nadlan" />
        {/* <p>ברוכים הבאים לחברת לינק אשר מתמחה בתיווך הנכסים.

          בה אנו עוזרים להפוך את החלום שלכם לבעלות על בית למציאות.

          צוות סוכני הנדל”ן המנוסים שלנו מחויב למצוא לך את הנכס המושלם, בין אם אתה מחפש את הבית הראשון שלך או את הבית שלך לנצח. אנו גאים להכיר את לקוחותינו ולהבין את הצרכים וההעדפות הייחודיות שלהם.

          מתחילתו ועד סופו, אנו נלווה אתכם בתהליך של קנייה או מכירה של נכס. אנחנו נטפל בכל הניירת והמשא ומתן כדי שתוכלו להירגע וליהנות מהדרך.

          בתיווך שלנו, אנו מאמינים בשקיפות וביושר. אנו נעדכן אותך בכל שלב ונענה על כל שאלה שיש לך.

          אז אם אתם מחפשים בית חדש, התקשרו אלינו או כנסו למשרד שלנו. נשמח לעזור לך למצוא את בית החלומות הבא שלך! 🏠🔑
        </p> */}
      </div>
    </div>
  )
}
