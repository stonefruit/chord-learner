import React, { useState, useRef, useEffect } from 'react'
import { noteNames } from '../utils/chordData'
import './KeySelector.css'

const KeySelector = ({ selectedKeys, onChange, chordSettings, onChordSettingsChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({})
  const dropdownRef = useRef(null)
  const triggerRef = useRef(null)

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
  
  useEffect(() => {
    if (isOpen && triggerRef.current && dropdownRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const dropdownHeight = dropdownRef.current.offsetHeight
      const viewportHeight = window.innerHeight
      
      // Check if dropdown would go below viewport
      if (triggerRect.bottom + dropdownHeight > viewportHeight - 20) {
        // Position above the trigger
        setDropdownPosition({
          bottom: `calc(100% + 0.5rem)`,
          top: 'auto'
        })
      } else {
        // Position below the trigger (default)
        setDropdownPosition({
          top: '100%',
          bottom: 'auto'
        })
      }
    }
  }, [isOpen])

  return (
    <div className="key-selector">
      <h3>Keys to Practice</h3>
      
      <div className="dropdown-container">
        <button 
          ref={triggerRef}
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
          <div ref={dropdownRef} className="dropdown-menu" style={dropdownPosition}>
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
            
            <div className="settings-divider"></div>
            
            <div className="chord-settings-section">
              <h4 className="section-title">Display Settings</h4>
              
              <label className="radio-option compact">
                <input
                  type="radio"
                  name="displayMode"
                  value="basic"
                  checked={chordSettings.display === 'basic'}
                  onChange={() => onChordSettingsChange({...chordSettings, display: 'basic'})}
                />
                <span className="radio-label">Basic chord</span>
                <span className="radio-indicator">
                  {chordSettings.display === 'basic' && '●'}
                </span>
              </label>
              
              <label className="radio-option compact">
                <input
                  type="radio"
                  name="displayMode"
                  value="full"
                  checked={chordSettings.display === 'full'}
                  onChange={() => onChordSettingsChange({...chordSettings, display: 'full'})}
                />
                <span className="radio-label">Full chord (all octaves)</span>
                <span className="radio-indicator">
                  {chordSettings.display === 'full' && '●'}
                </span>
              </label>
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