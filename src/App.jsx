import React from 'react';
import { useRoutes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';

function App() {

  let routes = useRoutes([
    { path: '/',
      element: <HomePage />
    },
    { path: '/welcome',
      element: <LandingPage />
    }
  ])

  return routes;
}

export default App
