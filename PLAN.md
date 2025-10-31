# Quiz TUI App - Project Plan

## Overview
A beautiful Terminal User Interface (TUI) quiz application that fetches questions from quizapi.io and provides an interactive quiz experience.

## Tech Stack
- **Runtime**: Node.js v22.20.0
- **UI Framework**: `@clack/prompts` (modern, sleek CLI prompts) or `ink` (React-based TUI)
- **HTTP Client**: `axios` or native `fetch`
- **Styling**: `chalk` for colors, `boxen` for boxes
- **Configuration**: `dotenv` for API key management

## Features

### Phase 1 - MVP
- [ ] Fetch questions from quizapi.io API
- [ ] Display questions with multiple choice answers
- [ ] Interactive answer selection
- [ ] Show correct/incorrect feedback
- [ ] Track and display final score
- [ ] Beautiful TUI with colors and formatting

### Phase 2 - Enhanced Features
- [ ] Category selection menu
- [ ] Difficulty level selection (easy, medium, hard)
- [ ] Number of questions configuration
- [ ] Timer for each question
- [ ] Leaderboard/score history
- [ ] Retry option

### Phase 3 - Advanced Features
- [ ] Multiple quiz modes (timed, untimed, practice)
- [ ] Statistics and analytics
- [ ] Custom themes
- [ ] Export results

## Project Structure
```
quiz-cli/
├── src/
│   ├── index.js              # Entry point
│   ├── api/
│   │   └── quizApi.js        # API client for quizapi.io
│   ├── ui/
│   │   ├── menu.js           # Main menu interface
│   │   ├── quiz.js           # Quiz display logic
│   │   └── results.js        # Results display
│   ├── utils/
│   │   ├── config.js         # Configuration management
│   │   └── helpers.js        # Helper functions
│   └── constants.js          # Constants and enums
├── .env.example              # Example environment variables
├── .gitignore
├── package.json
└── README.md
```

## API Integration (quizapi.io)

### Key Endpoints
- `GET /api/v1/questions` - Fetch questions
  - Query params: `apiKey`, `limit`, `category`, `difficulty`, `tags`

### Required Setup
- API key from quizapi.io (free tier available)
- Store in `.env` file as `QUIZ_API_KEY`

## UI Flow

```
┌─────────────────────────────┐
│   Welcome to Quiz Master!   │
└─────────────────────────────┘
           ↓
┌─────────────────────────────┐
│  Select Category:           │
│  → General Knowledge        │
│    Science                  │
│    History                  │
│    Sports                   │
└─────────────────────────────┘
           ↓
┌─────────────────────────────┐
│  Select Difficulty:         │
│  → Easy                     │
│    Medium                   │
│    Hard                     │
└─────────────────────────────┘
           ↓
┌─────────────────────────────┐
│  Question 1/10              │
│                             │
│  What is the capital of     │
│  France?                    │
│                             │
│  → A) Paris                 │
│    B) London                │
│    C) Berlin                │
│    D) Madrid                │
└─────────────────────────────┘
           ↓
┌─────────────────────────────┐
│  ✓ Correct!                 │
│  Score: 1/1                 │
└─────────────────────────────┘
           ↓
       (Repeat)
           ↓
┌─────────────────────────────┐
│  Quiz Complete!             │
│                             │
│  Final Score: 8/10          │
│  Accuracy: 80%              │
│                             │
│  → Play Again               │
│    Exit                     │
└─────────────────────────────┘
```

## Implementation Steps

1. **Initialize Project**
   - Run `npm init`
   - Install dependencies
   - Setup .gitignore and .env

2. **API Client**
   - Create quizApi.js with methods to fetch questions
   - Handle API errors gracefully
   - Add retry logic

3. **UI Components**
   - Create welcome screen
   - Build category/difficulty selection menus
   - Design quiz question display
   - Create results summary screen

4. **Core Logic**
   - Question flow management
   - Score tracking
   - Answer validation
   - Session management

5. **Testing & Polish**
   - Test all user flows
   - Handle edge cases
   - Add loading states
   - Improve error messages

## Dependencies to Install

```json
{
  "dependencies": {
    "@clack/prompts": "^0.7.0",
    "chalk": "^5.3.0",
    "dotenv": "^16.3.1",
    "axios": "^1.6.0",
    "boxen": "^7.1.1",
    "ora": "^7.0.1"
  }
}
```

## Alternative: Using Ink (React-based TUI)
If we want a more component-based approach with React:
```json
{
  "dependencies": {
    "ink": "^4.4.1",
    "react": "^18.2.0",
    "ink-spinner": "^5.0.0",
    "ink-select-input": "^5.0.0"
  }
}
```

## Next Steps
1. Choose between @clack/prompts (simpler) or ink (React-based)
2. Get API key from quizapi.io
3. Initialize npm project
4. Start building!
