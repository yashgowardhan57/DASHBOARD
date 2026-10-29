/**
 * PracticalOS Dashboard - Runtime Environment Configuration
 * 
 * Configures API endpoints and backend URLs.
 * Deployed Backend: https://dashboard-3-lobf.onrender.com
 */
(function () {
  // Production backend URL deployed on Render
  const BACKEND_BASE = 'https://dashboard-3-lobf.onrender.com';

  // Override via window.__ENV__ if injected by server or HTML
  const env = window.__ENV__ || {};

  window.APP_CONFIG = {
    // Base URL for the dashboard backend / hub server
    hubUrl: env.HUB_URL || BACKEND_BASE,
    
    // Status health probe API endpoint
    statusEndpoint: env.STATUS_ENDPOINT || `${BACKEND_BASE}/api/status`,

    // Service ports & URLs for individual practical apps
    services: {
      auth: {
        port: 3001,
        url: env.AUTH_URL || `${BACKEND_BASE}/login`,
        health: env.AUTH_HEALTH || `${BACKEND_BASE}/api/health`
      },
      news: {
        port: 3002,
        url: env.NEWS_URL || `${BACKEND_BASE}/`,
        health: env.NEWS_HEALTH || `${BACKEND_BASE}/api/health`
      },
      student: {
        port: 3003,
        url: env.STUDENT_URL || `${BACKEND_BASE}/`,
        health: env.STUDENT_HEALTH || `${BACKEND_BASE}/api/health`,
        apiUrl: env.STUDENT_API_URL || `${BACKEND_BASE}/api/students`
      }
    }
  };
})();
