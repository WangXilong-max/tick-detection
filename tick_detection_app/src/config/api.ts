// API Configuration for different environments
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_CONFIG = {
  // Use proxy for local development, direct localhost for production
  baseURL: isLocalhost ? '/api' : 'http://localhost:8000',
  
  // Endpoints
  detectTick: '/detect-tick',
  health: '/health',
};

export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};
