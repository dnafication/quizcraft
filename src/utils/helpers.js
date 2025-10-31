export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function formatScore(correct, total) {
  const percentage = ((correct / total) * 100).toFixed(1);
  return {
    correct,
    total,
    percentage,
    emoji: percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : percentage >= 40 ? '🤔' : '📚'
  };
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
