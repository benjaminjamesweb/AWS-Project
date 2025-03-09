import React from 'react';
import { useRoutes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import {withAuthenticator} from "@aws-amplify/ui-react"

function App({ signOut, user }) {

  console.log(user)

  let routes = useRoutes([
    { path: '/',
      element: <HomePage logout={signOut} email={user.signInDetails.loginId} />
    },
    { path: '/welcome',
      element: <LandingPage />
    }
  ])

  return routes;
}

export default withAuthenticator(App)
