import React from "react";
import "./GameCard.css";

const GameCard = ({ game }) => {

  const imageUrl = `https://awsproject8323bb13017a4477bcd0711301be9dc229bad-dev.s3.us-west-2.amazonaws.com/${game.image}`;

  return (
    <div className="gamecard-div">
      <h1>{game.name}</h1>
      <p>{game.description}</p>
      <img src={imageUrl} alt={game.name} style={{ maxWidth: "100%", height: "auto" }} />
      {game.levels.map((level, index) => (
        <p key={index}>{level}</p>
      ))}
    </div>
  );
};

export default GameCard;
