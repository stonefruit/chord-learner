import { useState } from 'react'
import './App.css'
import PianoKeyboard from './components/PianoKeyboard'
import ChordQuiz from './components/ChordQuiz'
import KeySelector from './components/KeySelector'
import Score from './components/Score'

function App() {
  const [selectedKeys, setSelectedKeys] = useState(['C'])
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [currentChord, setCurrentChord] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)

  const handleAnswer = (isCorrect) => {
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }))
    setShowAnswer(true)
    
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    // Set new timeout
    const newTimeoutId = setTimeout(() => {
      setShowAnswer(false)
    }, 2000)
    setTimeoutId(newTimeoutId)
  }

  const handleChordGenerated = (chord) => {
    // Clear feedback when new chord is generated
    setShowAnswer(false)
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setCurrentChord(chord)
  }

  const resetScore = () => {
    setScore({ correct: 0, total: 0 })
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎹 Piano Chord Learner</h1>
        <div className="header-score">
          <Score score={score} onReset={resetScore} />
        </div>
      </header>
      
      <main className="app-main">
        <div className="piano-section">
          <PianoKeyboard 
            highlightedNotes={currentChord?.notes || []} 
            showAnswer={showAnswer}
          />
        </div>
        
        <div className="controls-section">
          <div className="left-panel">
            <KeySelector 
              selectedKeys={selectedKeys} 
              onChange={setSelectedKeys} 
            />
          </div>
          
          <div className="right-panel">
            <ChordQuiz 
              selectedKeys={selectedKeys}
              onChordGenerated={handleChordGenerated}
              onAnswer={handleAnswer}
              showAnswer={showAnswer}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App