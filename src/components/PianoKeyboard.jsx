import React from 'react'
import './PianoKeyboard.css'

const PianoKeyboard = ({ highlightedNotes = [], showAnswer, displayMode = 'basic' }) => {
  // Extended range for chord extensions (C3 to C6)
  const whiteKeys = [
    'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3',
    'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
    'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5',
    'C6'
  ]
  
  // Black keys with their positions (percentage from left)
  // Each white key is 1/22th of the width (4.545%), so positions are calculated accordingly
  const blackKeys = [
    { note: 'C#3', position: 3.86 },   // Between C3 and D3
    { note: 'D#3', position: 8.41 },   // Between D3 and E3
    { note: 'F#3', position: 17.5 },   // Between F3 and G3
    { note: 'G#3', position: 22.05 },  // Between G3 and A3
    { note: 'A#3', position: 26.59 },  // Between A3 and B3
    { note: 'C#4', position: 35.68 },  // Between C4 and D4
    { note: 'D#4', position: 40.23 },  // Between D4 and E4
    { note: 'F#4', position: 49.32 },  // Between F4 and G4
    { note: 'G#4', position: 53.86 },  // Between G4 and A4
    { note: 'A#4', position: 58.41 },  // Between A4 and B4
    { note: 'C#5', position: 67.5 },   // Between C5 and D5
    { note: 'D#5', position: 72.05 },  // Between D5 and E5
    { note: 'F#5', position: 81.14 },  // Between F5 and G5
    { note: 'G#5', position: 85.68 },  // Between G5 and A5
    { note: 'A#5', position: 90.23 }   // Between A5 and B5
  ]
  
  const isNoteHighlighted = (note) => {
    if (displayMode === 'full') {
      // In 'full' mode, highlight all octaves of the chord notes
      const noteName = note.slice(0, -1)
      return highlightedNotes.some(n => n === noteName)
    } else {
      // In 'basic' mode, notes come with octaves (e.g., 'C4', 'E4', 'G4')
      return highlightedNotes.includes(note)
    }
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