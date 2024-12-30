import React from 'react'
import { useUser } from '../../../../context/UserContext';


function Home() {

    const { user } = useUser();
  


  return (
    <div>
      hellöööö
      {user.name} 
      {user.surname}
    </div>
  )
}

export default Home