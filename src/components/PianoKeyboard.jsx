import React from 'react'
import './PianoKeyboard.css'

const PianoKeyboard = ({ highlightedNotes = [], showAnswer }) => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  const blackKeys = ['C#', 'D#', null, 'F#', 'G#', 'A#']
  
  const isNoteHighlighted = (note) => {
    return highlightedNotes.some(n => n.includes(note))
  }

  return (
    <div className="piano-keyboard">
      <div className="piano-container">
        <div className="black-keys">
          {blackKeys.map((note, index) => (
            note && (
              <div
                key={`black-${index}`}
                className={`black-key ${isNoteHighlighted(note) ? 'highlighted' : ''} ${showAnswer ? 'show-answer' : ''}`}
                style={{ left: `${index * 14.28 + 10}%` }}
              >
                <span className="note-label">{note}</span>
              </div>
            )
          ))}
        </div>
        <div className="white-keys">
          {whiteKeys.map((note, index) => (
            <div
              key={`white-${index}`}
              className={`white-key ${isNoteHighlighted(note) ? 'highlighted' : ''} ${showAnswer ? 'show-answer' : ''}`}
            >
              <span className="note-label">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PianoKeyboard