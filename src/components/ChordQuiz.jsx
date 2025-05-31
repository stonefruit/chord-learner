import React, { useState, useEffect } from 'react'
import { getRandomChord, chordTypes } from '../utils/chordData'
import './ChordQuiz.css'

const ChordQuiz = ({ selectedKeys, onChordGenerated, onAnswer, showAnswer }) => {
  const [currentChord, setCurrentChord] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [options, setOptions] = useState([])
  const [answered, setAnswered] = useState(false)

  const generateNewChord = () => {
    if (selectedKeys.length === 0) return
    
    const chord = getRandomChord(selectedKeys)
    setCurrentChord(chord)
    onChordGenerated(chord)
    
    // Generate multiple choice options
    const allOptions = Object.keys(chordTypes).map(type => {
      const chordName = `${chord.root}${chordTypes[type].symbol}`
      return chordName
    })
    
    // Shuffle options
    const shuffled = [...allOptions].sort(() => Math.random() - 0.5)
    setOptions(shuffled.slice(0, 4))
    
    setUserAnswer('')
    setAnswered(false)
  }

  useEffect(() => {
    generateNewChord()
  }, [selectedKeys])

  const handleAnswer = (answer) => {
    if (answered || showAnswer) return
    
    setUserAnswer(answer)
    setAnswered(true)
    const isCorrect = answer === currentChord.name
    onAnswer(isCorrect)
  }

  const handleNext = () => {
    generateNewChord()
  }

  if (selectedKeys.length === 0) {
    return (
      <div className="chord-quiz">
        <p>Please select at least one key to start the quiz!</p>
      </div>
    )
  }

  if (!currentChord) {
    return null
  }

  return (
    <div className="chord-quiz">
      <h2>What chord is this?</h2>
      
      <div className="options">
        {options.map((option) => (
          <button
            key={option}
            className={`option-button ${
              answered && option === currentChord.name ? 'correct' : ''
            } ${
              answered && option === userAnswer && option !== currentChord.name ? 'incorrect' : ''
            }`}
            onClick={() => handleAnswer(option)}
            disabled={answered}
          >
            {option}
          </button>
        ))}
      </div>
      
      {showAnswer && (
        <div className={`answer-feedback ${userAnswer === currentChord.name ? 'correct-feedback' : 'incorrect-feedback'}`}>
          <div className="feedback-icon">
            {userAnswer === currentChord.name ? '✓' : '✗'}
          </div>
          <p className={userAnswer === currentChord.name ? 'correct-text' : 'incorrect-text'}>
            {userAnswer === currentChord.name ? 'Excellent!' : `The answer is ${currentChord.fullName}`}
          </p>
        </div>
      )}
      
      {answered && (
        <button className="next-button" onClick={handleNext}>
          <span>Next Chord</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      )}
    </div>
  )
}

export default ChordQuiz