# Golf Tee Times Application

A full-stack application for managing golf tee times, featuring web scraping, a RESTful API, and a responsive frontend.

## Overview

This application allows users to:

- Scrape tee times from golf course websites
- View, create, edit, and delete tee times
- Filter tee times by date
- Manage tee time details including price, players, and holes

## Tech Stack

- **Backend**: Node.js with Express
- **Frontend**: SvelteKit 4
- **Database**: PostgreSQL (Docker containerized)
- **Styling**: TailwindCSS
- **Web Scraping**: Puppeteer

## Project Structure

```
golf-tee-times/
├── backend/               # Node.js Express API
│   ├── prisma/            # Database schema and migrations
│   ├── src/               # Backend source code
│   │   ├── app/           # Application logic
│   │   ├── libs/          # Utility libraries (scraper)
│   │   └── server.ts      # Entry point
├── frontend/              # SvelteKit application
│   ├── src/               # Frontend source code
│   │   ├── lib/           # Shared utilities and API client
│   │   ├── routes/        # SvelteKit routes and pages
│   │   └── app.css        # Global styles
├── docker-compose.yml     # Docker configuration
└── launch.sh              # Setup and launch script
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (v16+)
- npm or yarn

### Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/golf-tee-times.git
   cd golf-tee-times
   ```

2. Run the launch script to set up the entire application:

   ```bash
   chmod +x launch.sh
   ./launch.sh
   ```

   This script will:

   - Start the PostgreSQL container
   - Install backend dependencies
   - Run database migrations
   - Start the backend server
   - Install frontend dependencies
   - Start the frontend development server

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001/api

## Manual Setup

If you prefer to set up components individually:

### Database Setup

```bash
# Start PostgreSQL container
docker compose up -d
```

### Backend Setup

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Features

### Web Scraping

The application can scrape tee times from golf course websites:

- Automatically extracts time, price, player limits, and hole information
- Handles both 9-hole and 18-hole tee times
- Uses upsert operations to avoid duplicates

### API Endpoints

- `GET /api/tee-times`: Get all tee times
- `GET /api/tee-times/:id`: Get a specific tee time
- `GET /api/tee-times/date/:date`: Get tee times for a specific date
- `POST /api/tee-times`: Create a new tee time
- `PUT /api/tee-times/:id`: Update a tee time
- `DELETE /api/tee-times/:id`: Delete a tee time
- `POST /api/tee-times/scrape`: Scrape tee times from a golf course website

### Frontend Pages

- **Home Page**: View and filter tee times by date
- **Create Page**: Add a new tee time manually
- **Edit Page**: Modify existing tee time details
- **Delete Page**: Remove a tee time with confirmation

## Development Notes

### Database Schema

The main table structure for tee times includes:

- `id`: Unique identifier
- `time`: Tee time (e.g., "10:30 AM")
- `date`: Date of the tee time
- `price`: Cost in dollars
- `min_players`: Minimum number of players
- `max_players`: Maximum number of players
- `holes`: Number of holes (9 or 18)
- `golfCourseName`: Name of the golf course
- `courseUrl`: URL of the golf course website

### Technical Choices

1. **Docker for PostgreSQL**: Provides isolated, consistent database environment
2. **Prisma ORM**: Type-safe database access with migration support
3. **SvelteKit**: Fast, efficient frontend with server-side rendering capabilities
4. **TailwindCSS**: Utility-first CSS for rapid UI development
5. **Puppeteer**: Headless browser for reliable web scraping

## Future Improvements

With more time, the following enhancements could be made:

1. User authentication and authorization
2. Support for multiple golf courses
3. Automated scheduled scraping
4. Email notifications for price changes
5. Mobile app using Capacitor or similar
6. Comprehensive test suite
7. CI/CD pipeline for automated deployment

## Troubleshooting

If you encounter issues:

1. **Database Connection**: Ensure PostgreSQL container is running with `docker ps`
2. **Backend Errors**: Check logs in the backend terminal
3. **Frontend Issues**: Verify API URL configuration in `frontend/src/lib/api.ts`
4. **Scraper Problems**: The scraper may need updates if the golf course website changes

## License

This project is licensed under the MIT License - see the LICENSE file for details.
