# 🎹 Piano Chord Learner

A React-based web application that helps you learn to identify piano chords through interactive practice sessions.

## Features

- **Interactive Piano Keyboard**: Visual piano with highlighted chord notes
- **Chord Quiz**: Multiple-choice questions to test your chord identification skills
- **Customizable Practice**: Select which keys you want to practice
- **Progress Tracking**: Score tracking with percentage accuracy
- **Mobile-Friendly**: Responsive design that works great on phones and tablets
- **Multiple Chord Types**: Supports major, minor, diminished, augmented, and 7th chords

## Live Demo

🌐 **[Try the app here](https://yourusername.github.io/chord-learner/)**

*Replace `yourusername` with your actual GitHub username*

## How to Use

1. **Select Keys**: Use the dropdown to choose which keys you want to practice
2. **Identify Chords**: Look at the highlighted piano keys and choose the correct chord name
3. **Track Progress**: Your score and accuracy percentage are displayed at the top
4. **Reset**: Click the reset button to start over

## GitHub Pages Setup

To deploy this app to GitHub Pages:

### 1. Create GitHub Repository
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Piano Chord Learner app"

# Create GitHub repository and push
# Replace 'yourusername' with your GitHub username
git remote add origin https://github.com/yourusername/chord-learner.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The app will automatically deploy when you push to the main branch

### 3. Access Your App
Your app will be available at:
`https://yourusername.github.io/chord-learner/`

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling with gradients and animations
- **GitHub Actions** - Automated deployment
- **GitHub Pages** - Free hosting

## Project Structure

```
src/
├── components/
│   ├── PianoKeyboard.jsx    # Interactive piano display
│   ├── ChordQuiz.jsx        # Quiz functionality
│   ├── KeySelector.jsx      # Key selection dropdown
│   └── Score.jsx            # Score tracking
├── utils/
│   └── chordData.js         # Chord definitions and logic
├── App.jsx                  # Main application
└── main.jsx                 # Entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.