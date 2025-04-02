import React, { useEffect, useState } from 'react'
import './Gameplay.css'
import { useNavigate } from 'react-router-dom'
import { usePoints } from '../../contexts/PointsContext'

const Gameplay = ({ gameplay }) => {
  const [gamePoints, setGamePoints] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const { points, setPoints } = usePoints();

  const navigate = useNavigate()

  const resetGame = () => {
    setGamePoints(0)
    setCurrentQuestion(0)
    setIsFading(false)
  }


  const s3URL = `https://awsproject8323bb13017a4477bcd0711301be9dc229bad-dev.s3.us-west-2.amazonaws.com/`

  const questions = [
    { text: gameplay.q1, media: gameplay.q1media, answers: gameplay.a1 },
    { text: gameplay.q2, media: gameplay.q2media, answers: gameplay.a2 },
    { text: gameplay.q3, media: gameplay.q3media, answers: gameplay.a3 }
  ]

  const handleAnswer = (pointsEarned) => {
    setIsFading(true)
  
    setTimeout(() => {
      const newGamePoints = gamePoints + pointsEarned
      const nextQuestion = currentQuestion + 1
  
      setGamePoints(newGamePoints)
      setCurrentQuestion(nextQuestion)
      setIsFading(false)
  
      if (nextQuestion >= questions.length) {
        setPoints(prev => prev + newGamePoints)
      }
    }, 400)
  }

  const isFinished = currentQuestion >= questions.length

  return (
    <div className='gameplay-container'>
      <h2 className='points-header'>Points: {gamePoints}</h2>

      {!isFinished ? (
        <div className={`gameplay-div-2 fade ${isFading ? 'fade-out' : 'fade-in'}`}>
          <h2>{questions[currentQuestion].text}</h2>
          <img
          className='question-image'
            src={`${s3URL}${questions[currentQuestion].media}`}
            alt={`Q${currentQuestion + 1} media`}
          />
          <div className='answers-div'>
            {questions[currentQuestion].answers.map((answer, index) => (
              <button
                key={`q${currentQuestion}-a${index}`}
                onClick={() => handleAnswer(answer.points)}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="result-message">
          <h2>You scored {gamePoints} points!</h2>
          <div className='buttons-div'>
          <button onClick={resetGame}>Play again</button>
          <button onClick={() => navigate('/')}>Home</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gameplay
