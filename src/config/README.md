# Environment Configuration Guide

This directory contains the environment configuration for the School LMS application.

## 📁 Files

- `environment.js` - Main configuration file that manages all environment settings

## 🔧 How It Works

The application automatically detects whether it's running in **development** or **production** mode based on:

1. **`.env` file** (highest priority)
2. **Hostname detection** (localhost = development)
3. **Default**: production (for safety)

## 🚀 Quick Start

### For Local Development

1. Create a `.env` file in the `client` folder:

```bash
REACT_APP_ENV=development
```

2. Start your local backend server on port 5000
3. Start the frontend: `npm start`
4. App will use: `http://localhost:5000/api`

### For Production Deployment

1. Set environment variable in Vercel/hosting platform:

```bash
REACT_APP_ENV=production
```

2. Or don't create `.env` file - it will auto-detect production
3. App will use: `https://school-lms-backend-xsqm.onrender.com/api`

## ⚙️ Configuration Options

### Development Mode

```javascript
API_BASE_URL: 'http://localhost:5000/api'
SOCKET_URL: 'http://localhost:5000'
TIMEOUT: 10000 (10 seconds)
DEBUG: true (shows console logs)
```

### Production Mode

```javascript
API_BASE_URL: 'https://school-lms-backend-xsqm.onrender.com/api'
SOCKET_URL: 'https://school-lms-backend-xsqm.onrender.com'
TIMEOUT: 30000 (30 seconds - handles Render cold starts)
DEBUG: false (no console logs)
```

## 🎯 Usage in Code

```javascript
import { API_BASE_URL, IS_DEVELOPMENT, DEBUG } from "../config/environment";

// Check environment
if (IS_DEVELOPMENT) {
  console.log("Running in development mode");
}

// API URL is automatically set
// You don't need to do anything - api.js uses it automatically
```

## 🔀 Switching Environments

### Force Production Mode on Localhost

Edit `.env`:

```bash
REACT_APP_ENV=production
```

### Force Development Mode in Production

Edit `.env`:

```bash
REACT_APP_ENV=development
```

## 🐛 Debugging

In development mode, you'll see console logs like:

```
🔧 Environment: development
🌐 API URL: http://localhost:5000/api
🔌 Socket URL: http://localhost:5000
📤 API Request: POST /auth/login
📥 API Response: /auth/login 200
```

In production mode, these logs are hidden for performance.

## 📝 Adding New Configuration

Edit `src/config/environment.js`:

```javascript
const ENVIRONMENTS = {
  development: {
    API_BASE_URL: "http://localhost:5000/api",
    YOUR_NEW_CONFIG: "dev-value",
  },
  production: {
    API_BASE_URL: "https://your-api.com/api",
    YOUR_NEW_CONFIG: "prod-value",
  },
};

// Export it
export const YOUR_NEW_CONFIG = config.YOUR_NEW_CONFIG;
```

## 🔒 Security Notes

- Never commit `.env` file with sensitive data
- Use `.env.example` as a template
- Production API URLs are safe to commit (they're public anyway)
- Secrets should be in backend environment variables, not frontend

## 🆘 Troubleshooting

### Login fails with 500 error

- Check if backend is running (development) or awake (production)
- Verify API_BASE_URL in console (development mode)
- Backend on Render may take 30-50 seconds to wake up

### API calls go to wrong URL

- Check `.env` file: `REACT_APP_ENV=development` or `production`
- Clear browser cache and restart: `npm start`
- Check console in development mode for current API URL

### Can't connect to localhost backend

- Ensure backend is running: `cd server && npm start`
- Check backend is on port 5000
- Verify `.env` has `REACT_APP_ENV=development`

## 📚 Related Files

- `/client/.env` - Your local environment config (git-ignored)
- `/client/.env.example` - Template for .env file
- `/client/src/services/api.js` - Uses this configuration
- `/client/src/context/SocketContext.js` - Uses this configuration
