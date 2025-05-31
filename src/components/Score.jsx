import React from 'react'
import './Score.css'

const Score = ({ score, onReset }) => {
  const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0

  return (
    <div className="score-container">
      <h3>Score</h3>
      <div className="score-display">
        <div className="score-text">
          {score.correct} / {score.total}
        </div>
        <div className="score-percentage">
          {percentage}%
        </div>
      </div>
      {score.total > 0 && (
        <button className="reset-button" onClick={onReset}>
          Reset Score
        </button>
      )}
    </div>
  )
}

export default Score