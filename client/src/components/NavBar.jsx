import { BrowserRouter as Router, Link } from 'react-router-dom';
import'./NavBar.css'
import logo from '../assets/image/link_logo.png'

export default function NavBar() {
  return (
    <nav className='nav'>
      <ul>
         <li>
         <Link to='/AgentProfile'>איזור אישי לסוכנים</Link>
         </li>
      </ul>
       {/* <Link to='/'>
        <img className='logo' src={logo} alt="logo" />
      </Link> */}
    </nav>
  )
}
