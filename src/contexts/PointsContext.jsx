import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getUserInfo } from '../graphql/queries';
import { createUserInfo, updateUserInfo } from '../graphql/mutations';

const PointsContext = createContext();

export const usePoints = () => useContext(PointsContext);


export const PointsProvider = ({ email, children }) => {
    const [points, setPoints] = useState(0);
    const [loadingPoints, setLoadingPoints] = useState(true);
  
    useEffect(() => {
      if (!email) return;
  
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
  
            setPoints(0);
          } else {
            setPoints(userInfo.totalPoints);
          }
  
        } catch (error) {
          console.error('Error in ensureUserInfo:', error);
        } finally {
          setLoadingPoints(false);
        }
      };
  
      ensureUserInfo();
    }, [email]);
  
    const updatePoints = async (newPoints) => {
      setPoints(newPoints);
  
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
      <PointsContext.Provider value={{ points, setPoints: updatePoints, loadingPoints }}>
        {children}
      </PointsContext.Provider>
    );
  };
  