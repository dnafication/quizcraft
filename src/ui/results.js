import * as clack from '@clack/prompts';
import chalk from 'chalk';
import { formatScore } from '../utils/helpers.js';

export function displayResults(score, total, questions, userAnswers) {
  const { correct, percentage, emoji } = formatScore(score, total);
  
  console.log('\n');
  clack.outro(
    chalk.bold.cyan('\n🎊 Quiz Complete! 🎊\n') +
    chalk.white('─'.repeat(50)) + '\n' +
    chalk.bold.yellow(`${emoji} Final Score: ${correct}/${total} (${percentage}%)\n`) +
    chalk.white('─'.repeat(50))
  );

  let performanceMessage = '';
  if (percentage >= 80) {
    performanceMessage = chalk.green('🌟 Excellent work! You really know your stuff!');
  } else if (percentage >= 60) {
    performanceMessage = chalk.blue('👍 Good job! Keep it up!');
  } else if (percentage >= 40) {
    performanceMessage = chalk.yellow('🤔 Not bad, but there\'s room for improvement!');
  } else {
    performanceMessage = chalk.red('📚 Keep studying! You\'ll do better next time!');
  }

  console.log('\n' + performanceMessage + '\n');
}

export async function askPlayAgain() {
  const playAgain = await clack.select({
    message: 'What would you like to do?',
    options: [
      { value: 'play', label: '🔄 Play Again' },
      { value: 'exit', label: '👋 Exit' }
    ]
  });

  if (clack.isCancel(playAgain)) {
    return false;
  }

  return playAgain === 'play';
}
