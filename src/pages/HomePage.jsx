import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    const navigate = useNavigate()

    return (
        <div className='homepage-container'>
            <h1>Home page</h1>

            <button onClick={() => navigate('/welcome')}>Log out</button>
        </div>
    )
}

export default HomePage