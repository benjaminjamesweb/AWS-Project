import { generateClient } from 'aws-amplify/api';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getGame, getGameplay, listGameplays } from '../graphql/queries';
import Header from '../components/Header/Header';
import './styles/GamePage.css'
import { usePoints } from '../contexts/PointsContext';

const GamePage = ({ email, logout }) => {
  const { gameid } = useParams(); 
  const [selectedLevel, setSelectedLevel] = useState("");
  const [game, setGame] = useState(null);
  const [gameplay, setGameplay] = useState(null)
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false)
    const { points, setPoints, loadingPoints } = usePoints();

  const navigate = useNavigate()

  const imageUrl = game?.image
  ? `https://awsproject8323bb13017a4477bcd0711301be9dc229bad-dev.s3.us-west-2.amazonaws.com/${game.image}`
  : "";

  const s3URL = `https://awsproject8323bb13017a4477bcd0711301be9dc229bad-dev.s3.us-west-2.amazonaws.com/`


  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
    console.log('selected level:', selectedLevel)
  };

  const handleClickPlay = () => {
    setIsPlaying(true)
  }

  useEffect(() => {
    if (!gameid) return; 
  
    const fetchGame = async () => {
      const client = generateClient();
  
      try {
        const result = await client.graphql({
          query: getGame,
          variables: { 
            id: gameid
          } 
        });
  
        if (result.data?.getGame) {
          setGame(result.data.getGame);
        } else {
          console.error("Game not found");
        }
      } catch (err) {
        console.error("GraphQL error:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchGame();
  }, [gameid]);
  

  useEffect(() => {
    if (!gameid) return; 
  
    const fetchGameplay = async () => {
      const client = generateClient();
  
      try {
        const result = await client.graphql({
          query: listGameplays, 
        });
  
        console.log("GraphQL Response:", result); 
  
        if (result.data?.listGameplays?.items.length > 0) {

          const filteredGameplay = result.data.listGameplays.items.find(
            (gameplay) => gameplay.gameid === gameid && gameplay.proficiency === selectedLevel
          );

          console.log(filteredGameplay)
  
          if (filteredGameplay) {
            setGameplay(filteredGameplay);
          } else {
            console.error("No gameplay found for this gameid.");
          }
        } else {
          console.error("No gameplay data available.");
        }
      } catch (err) {
        console.error("GraphQL error:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchGameplay();
  }, [gameid, selectedLevel]);
  
  
  

  if (loading) return <p>Loading game details...</p>;
if (!game) return <p>Error: Game not found.</p>;

  return (
    <div className='gamepage-container'>
        <Header email={email} logout={logout}/>

    <div className='pregame-div'>
        
        <div className='game-info-div'>
            <button onClick={() => navigate('/')}>Back</button>
        <h1>Welcome to {game.name}!</h1>
        {/* <p>{game.description}</p> */}
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
          <h2>{game.name}</h2>
          <p>{game.description}</p>
          <p>{game?.instructions}</p>
        </>
      )}

  {isPlaying && (
    <>
      <h2>{gameplay.q1}</h2>
          <img src={`${s3URL}${gameplay?.q1media}`} alt="Q1 media" />
          {gameplay.a1?.map((answer, index) => (
            <button key={`a1-${index}`}
            onClick={() => setPoints(points + answer.points)}
            >
              {answer.text}
            </button>
          ))}

          <h2>{gameplay.q2}</h2>
          <img src={`${s3URL}${gameplay?.q2media}`} alt="Q2 media" />
          <img src={gameplay?.q2media} alt="" />
          {gameplay.a2?.map((answer, index) => (
            <button 
            key={`a2-${index}`}
            onClick={() => setPoints(points + answer.points)}
            >
              {answer.text}
            </button>
          ))}

          <h2>{gameplay.q3}</h2>
          <img src={`${s3URL}${gameplay?.q3media}`} alt="Q3 media" />
          {gameplay.a3?.map((answer, index) => (
            <button key={`a3-${index}`}
            onClick={() => setPoints(points + answer.points)}
            >
              {answer.text}
            </button>
          ))}
    </>
  )}
</div>


    </div>


    </div>
  );
};

export default GamePage;
