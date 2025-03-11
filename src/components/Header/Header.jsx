import React from 'react'
import './Header.css'

const Header = ({email, logout}) => {

    const points = 50

  return (
    <div className='header-div'>

        <h2>Your points: {points}</h2>

        <h1>Anglophoria</h1>

        <button onClick={logout}>Sign out of {email}</button>
    </div>
  )
}

export default Header