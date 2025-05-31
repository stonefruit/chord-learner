import { useState } from 'react'
import './App.css'
import PianoKeyboard from './components/PianoKeyboard'
import ChordQuiz from './components/ChordQuiz'
import KeySelector from './components/KeySelector'
import Score from './components/Score'

function App() {
  const [selectedKeys, setSelectedKeys] = useState(['C'])
  const [chordSettings, setChordSettings] = useState({
    display: 'basic'
  })
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
  
  // Get highlighted notes based on display settings
  const getHighlightedNotes = () => {
    if (!currentChord) return []
    
    switch (chordSettings.display) {
      case 'basic':
        // For basic mode, we need to assign octaves to create a compact chord
        return assignOctavesToChord(currentChord.notes)
      case 'full':
        // For full chord, return just the note names (will highlight all octaves)
        return currentChord.notes
      default:
        return currentChord.notes
    }
  }
  
  // Helper function to assign octaves to chord notes for compact display
  const assignOctavesToChord = (notes) => {
    if (!notes || notes.length === 0) return []
    
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    const result = []
    
    // Start with the first note in octave 4
    result.push(notes[0] + '4')
    
    // For subsequent notes, choose the octave that creates the smallest interval
    for (let i = 1; i < notes.length; i++) {
      const prevNote = result[i - 1]
      const prevNoteName = prevNote.slice(0, -1)
      const prevOctave = parseInt(prevNote.slice(-1))
      const prevIndex = noteNames.indexOf(prevNoteName)
      
      const currentNoteName = notes[i]
      const currentIndex = noteNames.indexOf(currentNoteName)
      
      // Calculate intervals for same octave and next octave
      const intervalSame = (currentIndex - prevIndex + 12) % 12
      const intervalNext = intervalSame === 0 ? 12 : intervalSame
      
      // Choose the octave that creates the smaller interval
      if (intervalSame <= 6) {
        result.push(currentNoteName + prevOctave)
      } else {
        result.push(currentNoteName + (prevOctave + 1))
      }
    }
    
    return result
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
            highlightedNotes={getHighlightedNotes()} 
            showAnswer={showAnswer}
            displayMode={chordSettings.display}
          />
        </div>
        
        <div className="controls-section">
          <div className="left-panel">
            <KeySelector 
              selectedKeys={selectedKeys} 
              onChange={setSelectedKeys}
              chordSettings={chordSettings}
              onChordSettingsChange={setChordSettings}
            />
          </div>
          
          <div className="right-panel">
            <ChordQuiz 
              selectedKeys={selectedKeys}
              chordSettings={chordSettings}
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