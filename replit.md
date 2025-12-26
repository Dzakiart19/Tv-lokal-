# TV Lokal Premium

## Overview
An Indonesian TV streaming web application with a Netflix-style interface. Users can browse and watch local Indonesian TV channels through embedded streams.

## Tech Stack
- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (CDN)
- **AI Features**: Google Gemini API (optional, for recommendations)

## Project Structure
```
/
├── App.tsx              # Main application component
├── index.tsx            # React entry point
├── index.html           # HTML template
├── constants.ts         # Channel data and constants
├── types.ts             # TypeScript type definitions
├── vite.config.ts       # Vite configuration
├── components/
│   ├── Header.tsx       # Navigation header
│   └── ChannelCard.tsx  # Channel card component
└── services/
    └── geminiService.ts # Gemini AI integration
```

## Development
- Run: `npm run dev` (starts on port 5000)
- Build: `npm run build` (outputs to dist/)

## Environment Variables
- `GEMINI_API_KEY`: Optional Google Gemini API key for AI recommendations

## Notes
- The app uses Tailwind CSS via CDN for simplicity
- AI features (recommendations, channel vibes) require a Gemini API key
- Frontend is configured to allow all hosts for Replit's proxy
