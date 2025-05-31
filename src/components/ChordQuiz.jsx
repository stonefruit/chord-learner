import React, { useState, useEffect } from "react";
import { getRandomChord, chordTypes, generateChord } from "../utils/chordData";
import "./ChordQuiz.css";

const ChordQuiz = ({
  selectedKeys,
  chordSettings,
  onChordGenerated,
  onAnswer,
  showAnswer,
}) => {
  const [currentChord, setCurrentChord] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);

  const generateNewChord = () => {
    if (selectedKeys.length === 0) return;

    const chord = getRandomChord(selectedKeys);
    setCurrentChord(chord);
    onChordGenerated(chord);

    // Generate multiple choice options
    const correctAnswer = chord.name;
    const allChordTypes = Object.keys(chordTypes);

    // Generate 3 wrong options (different from the correct answer)
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const randomRoot =
        selectedKeys[Math.floor(Math.random() * selectedKeys.length)];
      const randomType =
        allChordTypes[Math.floor(Math.random() * allChordTypes.length)];

      const wrongChord = generateChord(randomRoot, randomType);
      const optionName = wrongChord.name;

      if (optionName !== correctAnswer && !wrongOptions.includes(optionName)) {
        wrongOptions.push(optionName);
      }
    }

    // Combine correct answer with wrong options and shuffle
    const allOptions = [correctAnswer, ...wrongOptions];
    const shuffled = allOptions.sort(() => Math.random() - 0.5);
    setOptions(shuffled);

    setUserAnswer("");
    setAnswered(false);
  };

  useEffect(() => {
    generateNewChord();
  }, [selectedKeys, chordSettings]);

  const handleAnswer = (answer) => {
    if (answered || showAnswer) return;

    setUserAnswer(answer);
    setAnswered(true);
    const isCorrect = answer === currentChord.name;
    onAnswer(isCorrect);
  };

  const handleNext = () => {
    generateNewChord();
  };
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Number keys 1-4 to select answers
      if (!answered && !showAnswer && e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1;
        if (index < options.length) {
          handleAnswer(options[index]);
        }
      }
      
      // Spacebar to go to next chord
      if (answered && e.key === ' ') {
        e.preventDefault(); // Prevent page scroll
        handleNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [answered, showAnswer, options]);

  if (selectedKeys.length === 0) {
    return (
      <div className="chord-quiz">
        <p>Please select at least one key to start the quiz!</p>
      </div>
    );
  }

  if (!currentChord) {
    return null;
  }

  return (
    <div className="chord-quiz">
      {showAnswer && (
        <div
          className={`answer-feedback-floating ${
            userAnswer === currentChord.name
              ? "correct-feedback"
              : "incorrect-feedback"
          }`}
        >
          <div className="feedback-icon">
            {userAnswer === currentChord.name ? "✓" : "✗"}
          </div>
          <p
            className={
              userAnswer === currentChord.name
                ? "correct-text"
                : "incorrect-text"
            }
          >
            {userAnswer === currentChord.name
              ? "Excellent!"
              : `The answer is ${currentChord.fullName}`}
          </p>
        </div>
      )}

      <h2>What chord is this?</h2>

      <div className="options">
        {options.map((option, index) => (
          <button
            key={option}
            className={`option-button ${
              answered && option === currentChord.name ? "correct" : ""
            } ${
              answered && option === userAnswer && option !== currentChord.name
                ? "incorrect"
                : ""
            }`}
            onClick={() => handleAnswer(option)}
            disabled={answered}
          >
            <span className="option-number">{index + 1}</span>
            {option}
          </button>
        ))}
      </div>

      {answered && (
        <button className="next-button" onClick={handleNext}>
          <span>Next Chord</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChordQuiz;
