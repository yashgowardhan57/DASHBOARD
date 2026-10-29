/**
 * PracticalOS Dashboard - Runtime Environment Configuration
 * 
 * Configures API endpoints and backend URLs.
 * Works seamlessly in both local development (multi-port microservices)
 * and production deployment (cloud backend on Render, Railway, Vercel, etc.).
 */
(function () {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  // Override via window.__ENV__ if injected by server or HTML
  const env = window.__ENV__ || {};

  window.APP_CONFIG = {
    // Base URL for the dashboard backend / hub server
    hubUrl: env.HUB_URL || (isLocal ? 'http://localhost:3000' : window.location.origin),
    
    // Status health probe API endpoint
    statusEndpoint: env.STATUS_ENDPOINT || (isLocal ? 'http://localhost:3000/api/status' : '/api/status'),

    // Service ports & URLs for individual practical apps
    services: {
      auth: {
        port: 3001,
        url: env.AUTH_URL || (isLocal ? 'http://localhost:3001/login' : '/api/auth/login'),
        health: env.AUTH_HEALTH || (isLocal ? 'http://localhost:3001/api/health' : '/api/auth/health')
      },
      news: {
        port: 3002,
        url: env.NEWS_URL || (isLocal ? 'http://localhost:3002/' : '/api/news/'),
        health: env.NEWS_HEALTH || (isLocal ? 'http://localhost:3002/api/health' : '/api/news/health')
      },
      student: {
        port: 3003,
        url: env.STUDENT_URL || (isLocal ? 'http://localhost:3003/' : '/api/students/'),
        health: env.STUDENT_HEALTH || (isLocal ? 'http://localhost:3003/api/health' : '/api/students/health')
      }
    }
  };
})();
