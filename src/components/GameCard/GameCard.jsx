import React, { useState } from "react";
import "./GameCard.css";
import { useNavigate } from "react-router-dom";

const GameCard = ({ game }) => {
  const navigate = useNavigate()

  const [selectedLevel, setSelectedLevel] = useState("");
  const imageUrl = `https://awsproject8323bb13017a4477bcd0711301be9dc229bad-dev.s3.us-west-2.amazonaws.com/${game.image}`;

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  return (
    <div className="gamecard-div">
      <h1>{game.name}</h1>
      <p>{game.description}</p>
      <img src={imageUrl} alt={game.name} style={{ maxWidth: "100%", height: "auto" }} />
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
          <button onClick={() => navigate(`/${game.id}`)}>Proceed</button>
        </div>
      )}
    </div>
  );
};

export default GameCard;
