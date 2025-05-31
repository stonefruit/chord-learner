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
    { note: 'C#3', position: 6.0 },   // Between C3 and D3
    { note: 'D#3', position: 13.1 },  // Between D3 and E3
    { note: 'F#3', position: 27.4 },  // Between F3 and G3
    { note: 'G#3', position: 34.5 },  // Between G3 and A3
    { note: 'A#3', position: 41.7 },  // Between A3 and B3
    { note: 'C#4', position: 56.0 },  // Between C4 and D4
    { note: 'D#4', position: 63.1 },  // Between D4 and E4
    { note: 'F#4', position: 77.4 },  // Between F4 and G4
    { note: 'G#4', position: 84.5 },  // Between G4 and A4
    { note: 'A#4', position: 91.7 }   // Between A4 and B4
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
            const showLabel = note === 'C4'
            return (
              <div
                key={`white-${index}`}
                className={`white-key ${isNoteHighlighted(note) ? 'highlighted' : ''} ${showAnswer ? 'show-answer' : ''}`}
              >
                {showLabel && (
                  <>
                    <span className="note-label">{noteName}</span>
                    <span className="octave-label">{note.slice(-1)}</span>
                  </>
                )}
              </div>
            )
          })}
        </div>
        
        {/* Black keys layer */}
        <div className="black-keys-layer">
          {blackKeys.map(({ note, position }) => {
            return (
              <div
                key={`black-${note}`}
                className={`black-key ${isNoteHighlighted(note) ? 'highlighted' : ''} ${showAnswer ? 'show-answer' : ''}`}
                style={{ left: `${position}%` }}
              >
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PianoKeyboard