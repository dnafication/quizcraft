import axios from 'axios';
import { config } from '../utils/config.js';

class QuizAPI {
  constructor() {
    this.baseURL = config.apiBaseUrl;
    this.apiKey = config.apiKey;
    
    // Add request interceptor for debugging (only if DEBUG=true)
    if (config.debug) {
      axios.interceptors.request.use(request => {
        console.log('\n🔍 API Request Debug:');
        console.log('URL:', request.url);
        console.log('Method:', request.method?.toUpperCase());
        console.log('Params:', request.params);
        console.log('Headers:', request.headers);
        console.log('Full URL:', `${request.baseURL || ''}${request.url}${request.params ? '?' + new URLSearchParams(request.params).toString() : ''}`);
        return request;
      });

      // Add response interceptor for debugging
      axios.interceptors.response.use(
        response => {
          console.log('\n✅ API Response:');
          console.log('Status:', response.status);
          console.log('Data:', JSON.stringify(response.data).substring(0, 200) + '...');
          return response;
        },
        error => {
          console.log('\n❌ API Error:');
          if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Status Text:', error.response.statusText);
            console.log('Data:', error.response.data);
          } else {
            console.log('Error:', error.message);
          }
          return Promise.reject(error);
        }
      );
    }
  }

  async fetchCategories() {
    try {
      const response = await axios.get(`${this.baseURL}/categories`, {
        params: {
          apiKey: this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Failed to fetch categories: ${error.response.status} ${error.response.statusText}`);
      }
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  }

  async fetchQuestions({ category, difficulty, limit = 10, tags = [] }) {
    try {
      const params = {
        apiKey: this.apiKey,
        limit
      };

      if (category) params.category = category;
      if (difficulty) params.difficulty = difficulty;
      if (tags.length > 0) params.tags = tags.join(',');

      const response = await axios.get(`${this.baseURL}/questions`, { params });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Failed to fetch questions: ${error.response.status} ${error.response.statusText}`);
      }
      throw new Error(`Failed to fetch questions: ${error.message}`);
    }
  }

  async fetchTags() {
    try {
      const response = await axios.get(`${this.baseURL}/tags`, {
        params: {
          apiKey: this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Failed to fetch tags: ${error.response.status} ${error.response.statusText}`);
      }
      throw new Error(`Failed to fetch tags: ${error.message}`);
    }
  }
}

export default new QuizAPI();
