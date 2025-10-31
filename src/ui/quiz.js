import * as clack from '@clack/prompts';
import chalk from 'chalk';

export async function displayQuestion(question, questionNumber, totalQuestions) {
  console.log('\n' + chalk.cyan('─'.repeat(60)));
  console.log(chalk.bold.white(`Question ${questionNumber}/${totalQuestions}`));
  console.log(chalk.cyan('─'.repeat(60)));
  console.log(chalk.yellow('\n' + question.question + '\n'));

  const answers = question.answers;
  const options = Object.entries(answers)
    .filter(([key, value]) => value !== null)
    .map(([key, value]) => {
      // Extract the letter from answer_a, answer_b, etc.
      const letter = key.split('_')[1]?.toUpperCase() || key.toUpperCase();
      return {
        value: key,
        label: `${letter}) ${value}`
      };
    });

  const answer = await clack.select({
    message: 'Select your answer:',
    options
  });

  if (clack.isCancel(answer)) {
    const shouldQuit = await clack.confirm({
      message: 'Are you sure you want to quit?'
    });

    if (shouldQuit) {
      clack.cancel('Quiz cancelled.');
      process.exit(0);
    }
    return displayQuestion(question, questionNumber, totalQuestions);
  }

  return answer;
}

export function showAnswerFeedback(isCorrect, correctAnswer, correctAnswerText = null, explanation = null) {
  if (isCorrect) {
    clack.log.success(chalk.green('✓ Correct!'));
  } else {
    clack.log.error(chalk.red('✗ Incorrect!'));
    if (correctAnswer) {
      // Extract the letter from answer_a, answer_b, etc.
      const letter = correctAnswer.split('_')[1]?.toUpperCase() || correctAnswer.toUpperCase();
      console.log(chalk.yellow(`The correct answer was: ${letter}${correctAnswerText ? `) ${correctAnswerText}` : ''}`));
    }
  }

  if (explanation) {
    console.log(chalk.gray(`💡 ${explanation}`));
  }
  console.log('');
}
