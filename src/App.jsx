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

  const handleAnswer = (isCorrect) => {
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }))
    setShowAnswer(true)
    setTimeout(() => {
      setShowAnswer(false)
    }, 2000)
  }

  const resetScore = () => {
    setScore({ correct: 0, total: 0 })
  }

  return (
    <div className="App">
      <h1>Piano Chord Learner</h1>
      
      <div className="controls">
        <KeySelector 
          selectedKeys={selectedKeys} 
          onChange={setSelectedKeys} 
        />
        <Score score={score} onReset={resetScore} />
      </div>

      <PianoKeyboard 
        highlightedNotes={currentChord?.notes || []} 
        showAnswer={showAnswer}
      />

      <ChordQuiz 
        selectedKeys={selectedKeys}
        onChordGenerated={setCurrentChord}
        onAnswer={handleAnswer}
        showAnswer={showAnswer}
      />
    </div>
  )
}

export default App