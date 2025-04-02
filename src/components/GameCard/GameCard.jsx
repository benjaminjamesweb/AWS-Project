import React, { useState } from "react";
import "./GameCard.css";
import { useNavigate } from "react-router-dom";

const GameCard = ({ game }) => {
  const navigate = useNavigate()

  const imageUrl = `https://awsproject8323bb13017a4477bcd0711301be9dc229bad-dev.s3.us-west-2.amazonaws.com/${game.image}`;


  return (
    <div className="gamecard-div" onClick={() => navigate(`/${game.id}`)}>
      <img src={imageUrl} alt={game.name} style={{ maxWidth: "100%", height: "auto" }} />
    </div>
  );
};

export default GameCard;
