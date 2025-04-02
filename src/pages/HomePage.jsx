import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listGames } from '../graphql/queries';
import GameCard from '../components/GameCard/GameCard';
import './styles/HomePage.css'
import Header from '../components/Header/Header';
import { getUserInfo } from '../graphql/queries';
import { createUserInfo } from '../graphql/mutations';


const HomePage = ({ email, logout }) => {
    const [games, setGames] = useState([]);

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
            <Header email={email} logout={logout}/>

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
