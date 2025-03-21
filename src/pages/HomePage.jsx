import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listGames } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard/GameCard';
import './styles/HomePage.css'
import Header from '../components/Header/Header';
import { getUserInfo } from '../graphql/queries';
import { createUserInfo } from '../graphql/mutations';


const HomePage = ({ email, logout }) => {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
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

    useEffect(() => {
        const fetchGames = async () => {
            const client = generateClient();

            const result = await client.graphql({ query: listGames });
            console.log(result);

            if (result.errors) {
                console.error(result.errors);
                return;
            }

            if (result.data && result.data.listGames && result.data.listGames.items) {
                setGames(result.data.listGames.items);
            }
        };

        fetchGames();
    }, []);

    return (
        <div className='homepage-container'>
            <Header points={points} setPoints={setPoints} email={email} logout={logout}/>

            <div className='games-div'> 
            {games.length > 0 ? (
                    games.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))
                ) : (
                    <p>Loading games...</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;
