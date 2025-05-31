import React from 'react'
import { noteNames } from '../utils/chordData'
import './KeySelector.css'

const KeySelector = ({ selectedKeys, onChange }) => {
  const toggleKey = (key) => {
    if (selectedKeys.includes(key)) {
      onChange(selectedKeys.filter(k => k !== key))
    } else {
      onChange([...selectedKeys, key])
    }
  }

  const selectAll = () => {
    onChange([...noteNames])
  }

  const selectNone = () => {
    onChange([])
  }

  return (
    <div className="key-selector">
      <h3>Select Keys to Practice</h3>
      <div className="key-buttons">
        {noteNames.map(note => (
          <button
            key={note}
            className={`key-button ${selectedKeys.includes(note) ? 'selected' : ''}`}
            onClick={() => toggleKey(note)}
          >
            {note}
          </button>
        ))}
      </div>
      <div className="select-actions">
        <button className="action-button" onClick={selectAll}>Select All</button>
        <button className="action-button" onClick={selectNone}>Clear</button>
      </div>
    </div>
  )
}

export default KeySelector