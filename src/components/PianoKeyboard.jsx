import React from 'react'
import './PianoKeyboard.css'

const PianoKeyboard = ({ highlightedNotes = [], showAnswer }) => {
  // Two octaves for better chord visualization
  const whiteKeys = [
    'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3',
    'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'
  ]
  
  // Black key positions (in terms of white key units)
  // Each number represents the position relative to white keys
  const blackKeyPositions = [
    { note: 'C#3', position: 0.65 },
    { note: 'D#3', position: 1.35 },
    { note: 'F#3', position: 3.65 },
    { note: 'G#3', position: 4.35 },
    { note: 'A#3', position: 5.35 },
    { note: 'C#4', position: 7.65 },
    { note: 'D#4', position: 8.35 },
    { note: 'F#4', position: 10.65 },
    { note: 'G#4', position: 11.35 },
    { note: 'A#4', position: 12.35 }
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
                style={{ left: `${position * (100 / 14)}%` }}
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