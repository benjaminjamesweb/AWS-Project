import { generateClient } from 'aws-amplify/api';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getGame } from '../graphql/queries';
import Header from '../components/Header/Header';
import './styles/GamePage.css'

const GamePage = ({ email, logout }) => {
  const { gameid } = useParams(); 
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      const client = generateClient();

      try {
        const result = await client.graphql({
          query: getGame,
          variables: { id: gameid } 
        });

        if (result.errors) {
          console.error(result.errors);
          return;
        }

        if (result.data?.getGame) {
          setGame(result.data.getGame);
        } else {
          console.log("Error")
        }
      } catch (err) {
        console.error("GraphQL error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameid]);

  if (loading) return <p>Loading game details...</p>;

  return (
    <div className='homepage-container'>
        <Header email={email} logout={logout}/>

    <div className='pregame-div'>
        <h1>Welcome to {game.name}!</h1>
        <p>{game.description}</p>
        <img src={game.image} />
    </div>

    </div>
  );
};

export default GamePage;
