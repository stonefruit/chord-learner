import React from 'react'
import './Score.css'

const Score = ({ score, onReset }) => {
  const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0
  
  const getScoreColor = () => {
    if (percentage >= 80) return 'excellent'
    if (percentage >= 60) return 'good'
    if (percentage >= 40) return 'fair'
    return 'poor'
  }

  return (
    <div className="score-container">
      <div className="score-content">
        <div className="score-label">Score</div>
        <div className="score-display">
          <div className="score-text">
            <span className="score-correct">{score.correct}</span>
            <span className="score-divider">/</span>
            <span className="score-total">{score.total}</span>
          </div>
          <div className={`score-percentage ${score.total > 0 ? getScoreColor() : ''}`}>
            {percentage}%
          </div>
        </div>
      </div>
      {score.total > 0 && (
        <button className="reset-button" onClick={onReset}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
          Reset
        </button>
      )}
    </div>
  )
}

export default Score