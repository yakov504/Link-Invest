import { useEffect, useState } from 'react' 
import axios from 'axios'
import './Profile.css'

export default function AgentProfile() {
  // const [ user, setUser ] = useState(null)
  // const [ loading, setLoading ] = useState(true);

  // useEffect(() => {
  //   const fetchUserDate = async () => {
  //     try{
  //       const token = localStorage.getItem('token');
  //       if(!token){
  //         setLoading(false)
  //         console.log(token,user);
          
  //         return;
  //       }
  //       const res = await axios.get('http://127.0.0.1:3000/api/v1/users/logme/:name', {
  //         headers: {Authorization: `Beares ${token}`},
  //       })
  //       setUser( res.data.data.user);
  //     }catch( err ){
  //       console.log('error fetching user',err);
  //     } finally{
  //       setLoading(false)
  //     }
  //   };
  //   fetchUserDate();
  // },[])

  // if(loading) return <p>Loading...</p>
  // if(!user) return <p>you are not logged in.</p>


  return (
    <div className='agentProfile'>
      <h1>ברוכים הבאים, yakov!</h1>
      <p>Email: </p>
      <p>Phone Number: </p>
      <p>Role: </p>
    </div>
  )
}
