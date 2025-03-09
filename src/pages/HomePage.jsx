import React, { useEffect } from 'react'
// import { API, graphqlOperation } from 'aws-amplify';
import { createGame } from '/src/graphql/mutations';
import { useNavigate } from 'react-router-dom'

const HomePage = ({ email, logout }) => {

    const navigate = useNavigate()

    console.log(email)

    const game1 = { name: 'Game name', description: 'Hello world!', image: 'image', levels: ['level'] };

    useEffect(() => {
        const createGameAsync = async () => {
            try {
                await API.graphql(graphqlOperation(createGame, { input: game1 }));
                console.log('Game created successfully');
            } catch (error) {
                console.error('Error creating game:', error);
            }
        };

        createGameAsync();
    }, []); 


    return (
        <div className='homepage-container'>
            <h1>Home page</h1>
            <div>{email}</div>

            
            <button onClick={logout}>Log out</button>

            <button onClick={() => navigate('/welcome')}>(nav btn)</button>
        </div>
    )
}

export default HomePage