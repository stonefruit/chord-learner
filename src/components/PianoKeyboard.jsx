import React from 'react'
import './PianoKeyboard.css'

const PianoKeyboard = ({ highlightedNotes = [], showAnswer }) => {
  // Two octaves for better chord visualization
  const whiteKeys = [
    'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3',
    'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'
  ]
  
  // Black keys with their positions (percentage from left)
  // Each white key is 1/14th of the width (7.14%), so positions are calculated accordingly
  const blackKeys = [
    { note: 'C#3', position: 5.36 },   // Between C3 and D3
    { note: 'D#3', position: 12.50 },  // Between D3 and E3
    { note: 'F#3', position: 26.79 },  // Between F3 and G3
    { note: 'G#3', position: 33.93 },  // Between G3 and A3
    { note: 'A#3', position: 41.07 },  // Between A3 and B3
    { note: 'C#4', position: 55.36 },  // Between C4 and D4
    { note: 'D#4', position: 62.50 },  // Between D4 and E4
    { note: 'F#4', position: 76.79 },  // Between F4 and G4
    { note: 'G#4', position: 83.93 },  // Between G4 and A4
    { note: 'A#4', position: 91.07 }   // Between A4 and B4
  ]
  
  const isNoteHighlighted = (note) => {
    // Extract just the note name without octave for comparison
    const noteName = note.slice(0, -1)
    return highlightedNotes.some(n => n === noteName)
  }

  return (
    <div className="piano-keyboard">
      <div className="piano-container">
        {/* White keys layer */}
        <div className="white-keys-layer">
          {whiteKeys.map((note, index) => {
            const noteName = note.slice(0, -1)
            return (
              <div
                key={`white-${index}`}
                className={`white-key ${isNoteHighlighted(note) ? 'highlighted' : ''} ${showAnswer ? 'show-answer' : ''}`}
              >
                <span className="note-label">{noteName}</span>
                <span className="octave-label">{note.slice(-1)}</span>
              </div>
            )
          })}
        </div>
        
        {/* Black keys layer */}
        <div className="black-keys-layer">
          {blackKeys.map(({ note, position }) => {
            const noteName = note.slice(0, -1)
            return (
              <div
                key={`black-${note}`}
                className={`black-key ${isNoteHighlighted(note) ? 'highlighted' : ''} ${showAnswer ? 'show-answer' : ''}`}
                style={{ left: `${position}%` }}
              >
                <span className="note-label">{noteName}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PianoKeyboard