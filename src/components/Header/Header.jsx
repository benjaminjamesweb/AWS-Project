import React, { useEffect, useState } from 'react'
import './Header.css'
import { generateClient } from 'aws-amplify/api';
import { createUserInfo, updateUserInfo } from '../../graphql/mutations';
import { getUserInfo } from '../../graphql/queries';

const Header = ({email, logout}) => {
      const [points, setPoints] = useState([])

      
    useEffect(() => {
      const ensureUserInfo = async () => {
          try {
              const client = generateClient();
  
              const result = await client.graphql({
                  query: getUserInfo,
                  variables: { id: email },
                  authMode: 'userPool'
              });

              const userInfo = result?.data?.getUserInfo;
  
              if (!userInfo) {
                  console.log("No user found - creating entry");
                  await client.graphql({
                      query: createUserInfo,
                      variables: {
                          input: {
                              id: email,        
                              totalPoints: 0
                          }
                      },
                      authMode: 'userPool'
                  });
  
                  console.log('UserInfo created');
                  setPoints(0)
              } else {
                  console.log('UserInfo already exists');
                  setPoints(userInfo.totalPoints)
                  console.log("user result:", userInfo)
              }
  
          } catch (error) {
              console.error('Error in ensureUserInfo:', error);
          }
      };
  
      ensureUserInfo();
  }, [email]);

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