# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Chord Learner is a React-based web application built with Vite that helps users learn to identify piano chords. It features an interactive piano keyboard, chord quiz functionality, and progress tracking.

## Common Commands

```bash
npm install      # Install dependencies
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

### Key Components
- **PianoKeyboard**: Visual piano display that highlights chord notes
- **ChordQuiz**: Multiple-choice quiz system for chord identification
- **KeySelector**: Allows users to choose which keys to practice
- **Score**: Tracks and displays user performance

### Data Structure
- Chord data and generation logic in `src/utils/chordData.js`
- Supports major, minor, diminished, augmented, and various 7th chords
- Dynamic chord generation based on selected root notes

### State Management
- Uses React hooks (useState) for local state management
- Parent component (App.jsx) manages global state for score, selected keys, and current chord