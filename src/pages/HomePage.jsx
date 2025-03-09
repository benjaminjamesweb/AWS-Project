import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listGames } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard/GameCard';

const HomePage = ({ email, logout }) => {
    const navigate = useNavigate();
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
            <h1>Home page</h1>
            <div>{email}</div>

            {games.length > 0 ? (
                games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))
            ) : (
                <p>Loading games...</p>
            )}

            <button onClick={logout}>Log out</button>
            <button onClick={() => navigate('/welcome')}>Navigate</button>
        </div>
    );
};

export default HomePage;
