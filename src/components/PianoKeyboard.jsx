import React from 'react'
import './PianoKeyboard.css'

const PianoKeyboard = ({ highlightedNotes = [], showAnswer }) => {
  // Two octaves for better chord visualization
  const whiteKeys = [
    'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3',
    'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'
  ]
  
  // Black key positions (accounting for gaps between white keys)
  // Position calculated based on white key index + offset for gap alignment
  const blackKeyPositions = [
    { note: 'C#3', position: 0.7 },   // Between C3 and D3
    { note: 'D#3', position: 1.7 },   // Between D3 and E3
    { note: 'F#3', position: 3.7 },   // Between F3 and G3
    { note: 'G#3', position: 4.7 },   // Between G3 and A3
    { note: 'A#3', position: 5.7 },   // Between A3 and B3
    { note: 'C#4', position: 7.7 },   // Between C4 and D4
    { note: 'D#4', position: 8.7 },   // Between D4 and E4
    { note: 'F#4', position: 10.7 },  // Between F4 and G4
    { note: 'G#4', position: 11.7 },  // Between G4 and A4
    { note: 'A#4', position: 12.7 }   // Between A4 and B4
  ]
  
  const isNoteHighlighted = (note) => {
    // Extract just the note name without octave for comparison
    const noteName = note.slice(0, -1)
    return highlightedNotes.some(n => n === noteName)
  }

  return (
    <div className="piano-keyboard">
      <div className="piano-container">
        <div className="white-keys">
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
        <div className="black-keys">
          {blackKeyPositions.map(({ note, position }) => {
            const noteName = note.slice(0, -1)
            return (
              <div
                key={`black-${note}`}
                className={`black-key ${isNoteHighlighted(note) ? 'highlighted' : ''} ${showAnswer ? 'show-answer' : ''}`}
                style={{ 
                  left: `${((position / 14) * 100)}%`,
                  transform: 'translateX(-50%)'
                }}
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