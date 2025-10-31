import * as clack from '@clack/prompts';
import chalk from 'chalk';
import quizApi from '../api/quizApi.js';
import { DIFFICULTY_LEVELS, QUIZ_LIMITS } from '../constants.js';

export async function showWelcome() {
  console.clear();
  clack.intro(chalk.bgCyan.bold(' QuizCraft 🎯 '));
  
  await clack.group({
    welcome: () => clack.note(
      'Test your knowledge with questions from various categories!\n' +
      'Select your preferences and start the quiz.',
      chalk.cyan('Welcome')
    )
  });
}

export async function selectCategory() {
  const spinner = clack.spinner();
  spinner.start('Loading categories...');
  
  try {
    const categories = await quizApi.fetchCategories();
    spinner.stop('Categories loaded!');
    
    // Convert categories to array of choices
    const categoryChoices = Object.entries(categories).map(([key, value]) => {
      // If value is an object with name property, use it; otherwise use the value itself
      const label = typeof value === 'object' && value.name ? value.name : value;
      return {
        value: label, // Use the name/label as the value
        label: label
      };
    });

    categoryChoices.unshift({ value: null, label: 'All Categories' });

    const category = await clack.select({
      message: 'Select a category:',
      options: categoryChoices
    });

    if (clack.isCancel(category)) {
      clack.cancel('Quiz cancelled.');
      process.exit(0);
    }

    return category;
  } catch (error) {
    spinner.stop('Failed to load categories');
    clack.log.error(chalk.red(error.message));
    process.exit(1);
  }
}

export async function selectDifficulty() {
  const difficulty = await clack.select({
    message: 'Select difficulty level:',
    options: [
      { value: null, label: 'Mixed (All Levels)' },
      { value: 'Easy', label: '🟢 Easy' },
      { value: 'Medium', label: '🟡 Medium' },
      { value: 'Hard', label: '🔴 Hard' }
    ]
  });

  if (clack.isCancel(difficulty)) {
    clack.cancel('Quiz cancelled.');
    process.exit(0);
  }

  return difficulty;
}

export async function selectQuestionCount() {
  const count = await clack.select({
    message: 'How many questions?',
    options: [
      { value: 5, label: '5 questions (Quick)' },
      { value: 10, label: '10 questions (Standard)' },
      { value: 15, label: '15 questions (Extended)' },
      { value: 20, label: '20 questions (Challenge)' }
    ]
  });

  if (clack.isCancel(count)) {
    clack.cancel('Quiz cancelled.');
    process.exit(0);
  }

  return count;
}

export async function confirmStart() {
  const ready = await clack.confirm({
    message: 'Ready to start the quiz?'
  });

  if (clack.isCancel(ready) || !ready) {
    clack.cancel('Quiz cancelled.');
    process.exit(0);
  }
}
