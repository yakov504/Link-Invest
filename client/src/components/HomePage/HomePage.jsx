import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import './HomePage.css'

import sharvit from '../../assets/image/שרביט.jpeg'
import yali from '../../assets/image/יהלי.jpeg'
import ysgav from '../../assets/image/ישגב.jpeg'


export default function HomePage() {
  // const [ characters, setCharacters ] = useState
  const characters = [{
    id:1, name: "גל שרביט", rule:'מייסד החברה',img: sharvit, phoneNumber:"+972504773340"},
    {id:2, name: "אורן גלילי", rule:"מייסד החברה",img:null, phoneNumber:"+972504773340"},
    {id:3, name: "ישגב גולדמן", rule:"agent meneger",img:ysgav , phoneNumber:"+972504773340"},
    {id:4, name: "יהלי לוי", rule:"agent meneger", img:yali, phoneNumber:"+972504773340"},
  ]
  
  const myCharacters = characters.length > 0 ?
  characters.map((character)=>(
      <ul className='characterList' key={character.id}>
        <img src={character.img} alt= {character.name} />
        <li className='character_name'>{character.name}</li>
        <li className='character_rule'>{character.rule}</li>
        <li className='character_phone'>{character.phoneNumber}</li>
      </ul> 
  )) : <p>no one</p>

  return (

    <div>
      <Header/>
        <h1>אנשים שונים - מטרה אחת!</h1>
      <div className='list_of_characters'>
        {myCharacters}
      </div>
      <Footer/>
    </div>
  )
}
