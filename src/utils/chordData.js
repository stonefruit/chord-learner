export const chordTypes = {
  // Basic triads
  major: { name: "Major", intervals: [0, 4, 7], symbol: "" },
  minor: { name: "Minor", intervals: [0, 3, 7], symbol: "m" },
  diminished: { name: "Diminished", intervals: [0, 3, 6], symbol: "dim" },
  augmented: { name: "Augmented", intervals: [0, 4, 8], symbol: "aug" },

  // Seventh chords
  major7: { name: "Major 7th", intervals: [0, 4, 7, 11], symbol: "maj7" },
  minor7: { name: "Minor 7th", intervals: [0, 3, 7, 10], symbol: "m7" },
  dominant7: { name: "Dominant 7th", intervals: [0, 4, 7, 10], symbol: "7" },
  halfDim7: {
    name: "Half-diminished 7th",
    intervals: [0, 3, 6, 10],
    symbol: "m7♭5",
  },
  dim7: { name: "Diminished 7th", intervals: [0, 3, 6, 9], symbol: "dim7" },
  minMaj7: { name: "Minor-major 7th", intervals: [0, 3, 7, 11], symbol: "mM7" },
  aug7: { name: "Augmented 7th", intervals: [0, 4, 8, 10], symbol: "aug7" },

  // Suspended chords
  sus2: { name: "Suspended 2nd", intervals: [0, 2, 7], symbol: "sus2" },
  sus4: { name: "Suspended 4th", intervals: [0, 5, 7], symbol: "sus4" },
  dominant7sus4: { name: "7sus4", intervals: [0, 5, 7, 10], symbol: "7sus4" },

  // Sixth chords
  major6: { name: "Major 6th", intervals: [0, 4, 7, 9], symbol: "6" },
  minor6: { name: "Minor 6th", intervals: [0, 3, 7, 9], symbol: "m6" },

  // Add chords
  add9: { name: "Add 9", intervals: [0, 4, 7, 14], symbol: "add9" },
  madd9: { name: "Minor add 9", intervals: [0, 3, 7, 14], symbol: "madd9" },

  // Extended chords
  major9: { name: "Major 9th", intervals: [0, 4, 7, 11, 14], symbol: "maj9" },
  minor9: { name: "Minor 9th", intervals: [0, 3, 7, 10, 14], symbol: "m9" },
  dominant9: {
    name: "Dominant 9th",
    intervals: [0, 4, 7, 10, 14],
    symbol: "9",
  },

  // Power chord (rock/pop)
  power: { name: "Power chord", intervals: [0, 7], symbol: "5" },

  // Altered chords (jazz/blues)
  dominant7sharp5: { name: "7#5", intervals: [0, 4, 8, 10], symbol: "7#5" },
  dominant7flat5: { name: "7♭5", intervals: [0, 4, 6, 10], symbol: "7♭5" },
  dominant7sharp9: { name: "7#9", intervals: [0, 4, 7, 10, 15], symbol: "7#9" },
  dominant7flat9: { name: "7♭9", intervals: [0, 4, 7, 10, 13], symbol: "7♭9" },
};

export const noteNames = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const generateChord = (rootNote, chordType) => {
  const rootIndex = noteNames.indexOf(rootNote);
  const chord = chordTypes[chordType];

  const notes = chord.intervals.map((interval) => {
    const noteIndex = (rootIndex + interval) % 12;
    return noteNames[noteIndex];
  });

  return {
    root: rootNote,
    type: chordType,
    name: `${rootNote}${chord.symbol}`,
    fullName: `${rootNote} ${chord.name}`,
    notes: notes,
  };
};

export const getRandomChord = (availableKeys) => {
  const randomKey =
    availableKeys[Math.floor(Math.random() * availableKeys.length)];
  const chordTypeKeys = Object.keys(chordTypes);
  const randomChordType =
    chordTypeKeys[Math.floor(Math.random() * chordTypeKeys.length)];

  return generateChord(randomKey, randomChordType);
};
