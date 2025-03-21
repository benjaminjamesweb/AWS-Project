import React, { useEffect, useState } from 'react'
import './Header.css'
import { generateClient } from 'aws-amplify/api';
import { updateUserInfo } from '../../graphql/mutations';

const Header = ({points, setPoints, email, logout}) => {

  const updatePointsInDB = async (newPoints) => {
    try {
      const client = generateClient();
  
      await client.graphql({
        query: updateUserInfo,
        variables: {
          input: {
            id: email,          
            totalPoints: newPoints
          }
        },
        authMode: 'userPool'
      });
  
      console.log("Points updated in DB:", newPoints);
    } catch (error) {
      console.error("Error updating points in DB:", error);
    }
  };
  

  return (
    <div className='header-div'>

        <h2>Your points: {points}</h2>
        <button
  onClick={() => {
    const newPoints = points + 1;
    setPoints(newPoints);
    updatePointsInDB(newPoints);
  }}
>
  Click to add points
</button>

<button
  onClick={() => {
    const newPoints = points - 1;
    setPoints(newPoints);
    updatePointsInDB(newPoints);
  }}
>
  Click to subtract points
</button>


        <h1>Anglophoria</h1>

        <button onClick={logout}>Sign out of {email}</button>
    </div>
  )
}

export default Header