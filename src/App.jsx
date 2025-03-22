import React from 'react';
import { useRoutes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import {withAuthenticator} from "@aws-amplify/ui-react"
import GamePage from './pages/GamePage';
import { PointsProvider } from './contexts/PointsContext';

function App({ signOut, user }) {


  console.log(user)

  let routes = useRoutes([
    { path: '/',
      element: <HomePage logout={signOut} email={user.signInDetails.loginId} />
    },
    { path: '/welcome',
      element: <LandingPage />
    },
    { path: '/:gameid',
      element: <GamePage logout={signOut} email={user.signInDetails.loginId}/>
    }
  ])

  return (
    <PointsProvider email={user.signInDetails.loginId}>
      {routes}
    </PointsProvider>
  );
}

export default withAuthenticator(App)
