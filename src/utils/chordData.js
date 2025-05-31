export const chordTypes = {
  major: { name: 'Major', intervals: [0, 4, 7], symbol: '' },
  minor: { name: 'Minor', intervals: [0, 3, 7], symbol: 'm' },
  diminished: { name: 'Diminished', intervals: [0, 3, 6], symbol: 'dim' },
  augmented: { name: 'Augmented', intervals: [0, 4, 8], symbol: 'aug' },
  major7: { name: 'Major 7th', intervals: [0, 4, 7, 11], symbol: 'maj7' },
  minor7: { name: 'Minor 7th', intervals: [0, 3, 7, 10], symbol: 'm7' },
  dominant7: { name: 'Dominant 7th', intervals: [0, 4, 7, 10], symbol: '7' },
  sus2: { name: 'Suspended 2nd', intervals: [0, 2, 7], symbol: 'sus2' },
  sus4: { name: 'Suspended 4th', intervals: [0, 5, 7], symbol: 'sus4' }
}

export const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export const generateChord = (rootNote, chordType) => {
  const rootIndex = noteNames.indexOf(rootNote)
  const chord = chordTypes[chordType]
  
  const notes = chord.intervals.map(interval => {
    const noteIndex = (rootIndex + interval) % 12
    return noteNames[noteIndex]
  })
  
  return {
    root: rootNote,
    type: chordType,
    name: `${rootNote}${chord.symbol}`,
    fullName: `${rootNote} ${chord.name}`,
    notes: notes
  }
}

export const getRandomChord = (availableKeys) => {
  const randomKey = availableKeys[Math.floor(Math.random() * availableKeys.length)]
  const chordTypeKeys = Object.keys(chordTypes)
  const randomChordType = chordTypeKeys[Math.floor(Math.random() * chordTypeKeys.length)]
  
  return generateChord(randomKey, randomChordType)
}