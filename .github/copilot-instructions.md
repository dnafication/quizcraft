# GitHub Copilot Instructions for QuizCraft

## Project Overview

QuizCraft is a Terminal User Interface (TUI) quiz application built with Node.js that provides an interactive quiz experience using questions from quizapi.io.

## Technology Stack

- **Runtime**: Node.js >= 18.0.0
- **Module System**: ES Modules (type: "module" in package.json)
- **Key Dependencies**:
  - `@clack/prompts` - Modern CLI prompts and UI elements
  - `chalk` - Terminal string styling
  - `axios` - HTTP client for API requests
  - `ora` - Terminal spinner for loading states
  - `dotenv` - Environment variable management

## Project Structure

```
src/
├── index.js              # Entry point with main quiz flow
├── api/
│   └── quizApi.js        # API client for quizapi.io
├── ui/
│   ├── menu.js           # Main menu interface (category, difficulty, count selection)
│   ├── quiz.js           # Quiz display logic
│   └── results.js        # Results display and play again prompt
├── utils/
│   ├── config.js         # Configuration management (API key validation)
│   └── helpers.js        # Helper functions
└── constants.js          # Constants and enums (API URLs, difficulty levels, limits)
```

## Coding Standards & Conventions

### General Guidelines

- Use ES6+ modern JavaScript features (async/await, arrow functions, destructuring, etc.)
- Always use ES module syntax (`import`/`export`, not `require`)
- Prefer `const` over `let`, avoid `var`
- Use async/await for asynchronous operations
- Include proper error handling with try-catch blocks (especially for async operations, API calls, and user input processing)

### Code Style

- Use 2-space indentation
- Use single quotes for strings unless string interpolation is needed
- Use semicolons at the end of statements
- Use descriptive variable and function names
- Keep functions focused and single-purpose
- Add JSDoc comments for complex functions

### File Organization

- Each file should have a single responsibility
- Export functions and constants using named exports
- Group related functionality together
- Keep API logic separate from UI logic
- Utility functions go in `src/utils/`

### UI/UX Guidelines

- Use `@clack/prompts` for all user interactions:
  - `clack.intro()` for welcome messages
  - `clack.select()` for menu selections
  - `clack.confirm()` for yes/no prompts
  - `clack.spinner()` for loading states
  - `clack.log.*` for informational messages
  - `clack.outro()` for goodbye messages
- Use `chalk` for all text styling and colors:
  - `chalk.cyan()` for titles and highlights
  - `chalk.green()` for success messages
  - `chalk.red()` for errors
  - `chalk.yellow()` for warnings
  - `chalk.gray()` for secondary text
- Provide clear feedback for user actions
- Show loading states for API calls
- Use emojis to enhance the user experience (e.g., 🟢 Easy, 🟡 Medium, 🔴 Hard)

### API Integration

- All API calls go through `src/api/quizApi.js`
- Use axios for HTTP requests
- Handle API errors gracefully with user-friendly messages
- Show spinners during API calls
- Validate API responses before using them
- API base URL is defined in `src/constants.js`

### Environment Configuration

- API key is required and loaded via `dotenv`
- Configuration validation happens in `src/utils/config.js`
- Use `process.env.QUIZ_API_KEY` to access the API key
- Optional `DEBUG` environment variable for debug logging
- Never commit `.env` files (already in .gitignore)

### Error Handling

- Always wrap async operations in try-catch blocks
- Provide user-friendly error messages
- Log errors using `clack.log.error()` with chalk.red()
- Exit gracefully on critical errors with `process.exit(1)`
- Handle API failures and network errors appropriately

### Testing Considerations

- The project currently has no automated test infrastructure
- When adding tests in the future:
  - Use a test framework compatible with ES modules (e.g., Vitest, Jest with ESM support)
  - Mock external dependencies (axios, @clack/prompts)
  - Test business logic separately from UI logic
  - Focus on testing `src/api/`, `src/utils/`, and core logic in `src/index.js`

### Common Patterns

1. **Quiz Flow Pattern**:
```javascript
// Validate config -> Show UI -> Get user input -> Fetch data -> Display quiz -> Show results
try {
  validateConfig();
  const selections = await getUserSelections();
  const data = await fetchData(selections);
  const results = await processData(data);
  displayResults(results);
} catch (error) {
  handleError(error);
}
```

2. **UI Component Pattern**:
```javascript
export async function selectSomething() {
  const value = await clack.select({
    message: 'Question prompt',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' }
    ]
  });
  return value;
}
```

3. **API Request Pattern**:
```javascript
async function fetchData(params) {
  const spinner = clack.spinner();
  spinner.start('Loading...');
  
  try {
    const response = await axios.get(url, { params });
    spinner.stop('Loaded!');
    return response.data;
  } catch (error) {
    spinner.stop('Failed to load');
    throw new Error(`API error: ${error.message}`);
  }
}
```

### Dependencies

- **Carefully evaluate new dependencies** before adding them - prefer using existing libraries when possible
- If a new dependency is needed:
  - Check if it's actively maintained
  - Verify it supports ES modules
  - Ensure it's compatible with Node.js >= 18
  - Consider bundle size for CLI tools
  - Evaluate security and licensing implications

### NPM Scripts

- `npm start` - Run the application
- `npm run dev` - Run with auto-reload (Node.js --watch flag)
- The project is published as a global CLI tool (`quizcraft` command)

### Publishing & Distribution

- The package is published to npm as `quizcraft`
- Entry point is `src/index.js` with shebang `#!/usr/bin/env node`
- Binary name is defined in `package.json` bin field
- Users can install globally: `npm install -g quizcraft`
- Users can run without installing: `npx quizcraft`

## When Making Changes

1. **Preserve existing patterns** - Follow the established code structure and style
2. **Test interactively** - Run the CLI and test your changes in the terminal
3. **Consider user experience** - Ensure changes enhance the interactive experience
4. **Maintain backwards compatibility** - Don't break existing functionality
5. **Update documentation** - Update README.md if user-facing changes are made
6. **Handle errors gracefully** - Always consider what could go wrong

## Common Tasks

### Adding a new menu option
1. Add the option to the appropriate `clack.select()` in `src/ui/menu.js`
2. Handle the new option in the quiz flow in `src/index.js`
3. Update relevant constants in `src/constants.js` if needed

### Adding a new API endpoint
1. Add the method to `src/api/quizApi.js`
2. Follow the existing pattern with axios and error handling
3. Use the API_BASE_URL constant from `src/constants.js`

### Modifying the UI
1. Make changes in the appropriate file under `src/ui/`
2. Use @clack/prompts components consistently
3. Apply chalk colors consistently with the rest of the app
4. Test in the terminal to see actual appearance

### Adding configuration options
1. Add new environment variables to `.env.example`
2. Document them in README.md
3. Validate them in `src/utils/config.js`

## Important Notes

- This is a user-facing CLI tool - the user experience is paramount
- The app must work both as a global install and via npx
- API key management is critical - handle missing/invalid keys gracefully
- Terminal appearance matters - test changes in an actual terminal
- Keep the bundle size reasonable for CLI tool distribution
