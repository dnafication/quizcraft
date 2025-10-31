import 'dotenv/config';

export const config = {
  apiKey: process.env.QUIZ_API_KEY,
  apiBaseUrl: 'https://quizapi.io/api/v1',
  debug: process.env.DEBUG === 'true'
};

export function validateConfig() {
  if (!config.apiKey) {
    throw new Error(
      'QUIZ_API_KEY is not set. Please create a .env file with your API key.\n' +
      'Get your API key from: https://quizapi.io/clientarea/settings/token'
    );
  }
}
