# Flyndr — Full-Stack Flight Search Platform

A **service-oriented web application** built with **Next.js 14**, **Node.js API Routes**, **SQLite**, and **Amadeus API** integration.

## Features

- **Real Flight Search** — Integrates with the Amadeus Self-Service API for live flight data
- **Smart Fallback** — Rich mock data system with 25+ routes, 15 airlines, and dynamic pricing
- **Persistent Database** — SQLite database for search history and saved favorites
- **RESTful API** — Clean Node.js API endpoints with proper error handling
- **Premium UI** — Dark theme with glassmorphism, animations, and responsive design
- **Favorites System** — Save and manage flights with full CRUD operations
- **Search History** — Track and re-run previous searches
- **Filtering & Sorting** — Sort by price, duration, departure; filter by stops

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), React 18, Tailwind CSS |
| Backend | Node.js (Next.js API Routes) |
| Database | SQLite (sql.js) |
| External API | Amadeus Flight Offers API |

## Architecture

```
app/
├── api/                       # RESTful API endpoints (Node.js)
│   ├── flights/search/        # GET - Search flights
│   ├── flights/popular/       # GET - Popular routes
│   ├── favorites/             # GET, POST, DELETE - Favorites CRUD
│   └── history/               # GET, DELETE - Search history
├── lib/                       # Service layer
│   ├── db.js                  # SQLite database (sql.js)
│   ├── amadeus.js             # Amadeus API client (OAuth2)
│   └── mockData.js            # Mock flight data generator
├── components/                # React UI components
├── favorites/page.jsx         # Favorites page
├── page.jsx                   # Home / search page
└── layout.jsx                 # Root layout
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/flights/search | Search flights (origin, destination, date, passengers, class) |
| GET | /api/flights/popular | Get popular routes |
| GET | /api/favorites | List saved flights |
| POST | /api/favorites | Save a flight |
| DELETE | /api/favorites?flightId=xxx | Remove a favorite |
| GET | /api/history | Get search history |
| DELETE | /api/history | Clear search history |

## Getting Started

```bash
npm install

# Optional: configure Amadeus API for live data
cp .env.example .env.local

npm run dev
```

Open http://localhost:3000

### Amadeus API Setup (Optional)

1. Create a free account at developers.amadeus.com
2. Create a new app in your dashboard
3. Copy your API Key and API Secret to .env.local

Without API keys, the app uses realistic mock data.

## Database

SQLite stored at data/flyndr.db (auto-created on first run).

Tables: searches, favorites

---

Built for UTECH — Full-stack web application with Node.js, API integration, and database persistence.
