import React from 'react'
import { use } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AgentProfile(props) {
  const [ user, setUser ] = useState(null)
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchUserDate = async () => {
      try{
        const token = localStorage.getItem('teken');
        if(!token){
          setLoading(false)
          return;
        }
        const res = await axios.get('http://127.0.0.1:3000/api/v1/users/logme/:name', {
          headers: {Authorization: `Beares ${token}`},
        })
        setUser( res.data.data.user);
      }catch( err ){
        console.log('error fetching user',err);
      } finally{
        setLoading(false)
      }
    };
    fetchUserDate();
  },[])

  if(loading) return <p>Loading...</p>
  if(!user) return <p>you are not logged in.</p>


  return (
    <div>
      <h1>Welcome to your profile, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Phone Number: {user.phone_number}</p>
      <p>Role: {user.role}</p>
    </div>
  )
}
