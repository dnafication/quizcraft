#!/usr/bin/env node

import * as clack from '@clack/prompts';
import chalk from 'chalk';
import { validateConfig } from './utils/config.js';
import quizApi from './api/quizApi.js';
import {
  showWelcome,
  selectCategory,
  selectDifficulty,
  selectQuestionCount,
  confirmStart
} from './ui/menu.js';
import { displayQuestion, showAnswerFeedback } from './ui/quiz.js';
import { displayResults, askPlayAgain } from './ui/results.js';
import { sleep } from './utils/helpers.js';

async function runQuiz() {
  try {
    validateConfig();
    
    await showWelcome();

    const category = await selectCategory();
    const difficulty = await selectDifficulty();
    const questionCount = await selectQuestionCount();

    await confirmStart();

    const spinner = clack.spinner();
    spinner.start('Loading questions...');

    const questions = await quizApi.fetchQuestions({
      category,
      difficulty,
      limit: questionCount
    });

    spinner.stop(`Loaded ${questions.length} questions!`);

    if (!questions || questions.length === 0) {
      clack.log.error(chalk.red('No questions available for the selected criteria.'));
      return;
    }

    await sleep(1000);

    let score = 0;
    const userAnswers = [];

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const userAnswer = await displayQuestion(question, i + 1, questions.length);

      const correctAnswers = Object.entries(question.correct_answers)
        .filter(([key, value]) => value === 'true')
        .map(([key]) => key.replace('_correct', ''));

      const isCorrect = correctAnswers.includes(userAnswer);
      
      if (isCorrect) {
        score++;
      }

      // Get the text of the correct answer
      const correctAnswerKey = correctAnswers[0];
      const correctAnswerText = question.answers[correctAnswerKey];

      showAnswerFeedback(
        isCorrect,
        correctAnswerKey,
        correctAnswerText,
        question.explanation
      );

      userAnswers.push({
        question: question.question,
        userAnswer,
        correctAnswer: correctAnswers[0],
        isCorrect
      });

      await sleep(1500);
    }

    displayResults(score, questions.length, questions, userAnswers);

    const playAgain = await askPlayAgain();
    if (playAgain) {
      console.clear();
      await runQuiz();
    } else {
      clack.outro(chalk.cyan('Thanks for playing! Goodbye! 👋'));
    }

  } catch (error) {
    clack.log.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}

runQuiz();
