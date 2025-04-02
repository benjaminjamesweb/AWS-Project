import React from 'react'
import './GameInstructions.css'
const GameInstructions = ({game}) => {
  return (
    <div>
        <h1>{game.name}</h1>
        <p>{game.description}</p>
        <p>Select a level and click play to start!</p>
    </div>
  )
}

export default GameInstructions