import { BrowserRouter as Router, Link } from 'react-router-dom';
import'./NavBar.css'
import logo from '../assets/image/link_logo.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function NavBar() {
  return (
    <nav className='nav'> 
      <ul>
        <li> 
          <Link to='/AgentProfile'>איזור אישי לסוכנים</Link> 
        </li> 
        <li> 
          <Link to='/'>עמוד הבית</Link>
        </li> 
      </ul>
      <ul className='icons'>
        <li> 
          <Link to='/'>{<FacebookIcon/>}</Link>
        </li> 
        <li> 
          <Link to='/'>{<InstagramIcon/>}</Link> 
        </li> 
        <li> 
          <Link to='/'>{<WhatsAppIcon/>}</Link> 
        </li> 
        <Link to='/'><img className='logo' src={logo} alt="logo" /></Link>
      </ul> 
    </nav>
  )
}
