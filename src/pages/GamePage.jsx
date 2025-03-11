import { generateClient } from 'aws-amplify/api';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getGame } from '../graphql/queries';
import Header from '../components/Header/Header';
import './styles/GamePage.css'

const GamePage = ({ email, logout }) => {
  const { gameid } = useParams(); 
  const [selectedLevel, setSelectedLevel] = useState("");
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false)

  const navigate = useNavigate()

  const imageUrl = game?.image
  ? `https://awsproject8323bb13017a4477bcd0711301be9dc229bad-dev.s3.us-west-2.amazonaws.com/${game.image}`
  : "";


  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleClickPlay = () => {
    setIsPlaying(true)
  }

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
    <div className='gamepage-container'>
        <Header email={email} logout={logout}/>

    <div className='pregame-div'>
        
        <div className='game-info-div'>
            <button onClick={() => navigate('/')}>Back</button>
        <h1>Welcome to {game.name}!</h1>
        <p>{game.description}</p>
        {imageUrl && <img src={imageUrl} alt={game.name} />}

        <div className="levels-div">
        <p>Choose a level:</p>
        <select value={selectedLevel} onChange={handleLevelChange}>
          <option value="" disabled>
            Select a level
          </option>
          {game.levels.map((level, index) => (
            <option key={index} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
      {selectedLevel && (
        <div className="message-div">
          <h2>You've selected {selectedLevel}!</h2>
          <button onClick={handleClickPlay}>Play</button>
        </div>
      )}
    </div>

    <div className='gameplay-div'>
        {!isPlaying && (
            <>
                <h2 style={{ marginTop: "25%" }}>Choose your proficiency level, and click Play!</h2>
            </>
        )}

        {isPlaying && (
            <>
                <h1>Here's the game!</h1>
                <p>Game instructions go here.</p>
                <button>Stop</button>
            </>
        )}
    </div>

    </div>


    </div>
  );
};

export default GamePage;
