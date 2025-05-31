import React, { useState } from 'react'
import { noteNames } from '../utils/chordData'
import './KeySelector.css'

const KeySelector = ({ selectedKeys, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleKey = (key) => {
    if (selectedKeys.includes(key)) {
      onChange(selectedKeys.filter(k => k !== key))
    } else {
      onChange([...selectedKeys, key])
    }
  }

  const selectAll = () => {
    onChange([...noteNames])
    setIsOpen(false)
  }

  const selectNone = () => {
    onChange([])
    setIsOpen(false)
  }

  const getDisplayText = () => {
    if (selectedKeys.length === 0) return 'Select keys...'
    if (selectedKeys.length === 1) return selectedKeys[0]
    if (selectedKeys.length === noteNames.length) return 'All keys'
    return `${selectedKeys.length} keys selected`
  }

  return (
    <div className="key-selector">
      <h3>Keys to Practice</h3>
      
      <div className="dropdown-container">
        <button 
          className="dropdown-trigger"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="dropdown-text">{getDisplayText()}</span>
          <svg 
            className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-actions">
              <button className="action-button" onClick={selectAll}>
                Select All
              </button>
              <button className="action-button" onClick={selectNone}>
                Clear
              </button>
            </div>
            
            <div className="dropdown-options">
              {noteNames.map(note => (
                <label key={note} className="dropdown-option">
                  <input
                    type="checkbox"
                    checked={selectedKeys.includes(note)}
                    onChange={() => toggleKey(note)}
                  />
                  <span className="option-text">{note}</span>
                  <span className="checkmark">
                    {selectedKeys.includes(note) && '✓'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="dropdown-backdrop" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default KeySelector