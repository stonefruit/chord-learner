import React from 'react'
import './PianoKeyboard.css'

const PianoKeyboard = ({ highlightedNotes = [], showAnswer }) => {
  // Two octaves for better chord visualization
  const whiteKeys = [
    'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3',
    'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'
  ]
  
  // Black keys with their positions (percentage from left)
  const blackKeys = [
    { note: 'C#3', position: 7.14 },   // Between C3 and D3
    { note: 'D#3', position: 21.43 },  // Between D3 and E3
    { note: 'F#3', position: 50 },     // Between F3 and G3
    { note: 'G#3', position: 64.29 },  // Between G3 and A3
    { note: 'A#3', position: 78.57 },  // Between A3 and B3
    { note: 'C#4', position: 107.14 }, // Between C4 and D4
    { note: 'D#4', position: 121.43 }, // Between D4 and E4
    { note: 'F#4', position: 150 },    // Between F4 and G4
    { note: 'G#4', position: 164.29 }, // Between G4 and A4
    { note: 'A#4', position: 178.57 }  // Between A4 and B4
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