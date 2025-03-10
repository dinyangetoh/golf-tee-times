# Golf Tee Times API

A backend API for managing golf course tee times with web scraping capabilities. This project provides endpoints for retrieving, creating, updating, and deleting tee times, as well as scraping tee times from golf course websites.

## Features

- Web scraping of tee times from golf course websites
- RESTful API for tee time management
- Prisma ORM for database operations
- TypeScript for type safety
- Clean architecture with controller, service, repository pattern

## Installation

```bash
# Install dependencies
npm ci

# Set up environment variables
cp .env.example .env
# Edit .env file with your database connection string and other settings

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

## Environment Variables

```
# Server Configuration
APP_PORT=3000

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/golf_tee_times?schema=public"

# JWT Configuration (if applicable)
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

## API Endpoints

### Tee Time Management

| Method | Endpoint                    | Description                                 |
| ------ | --------------------------- | ------------------------------------------- |
| GET    | `/api/tee-times`            | Get all tee times                           |
| GET    | `/api/tee-times/:id`        | Get a tee time by ID                        |
| GET    | `/api/tee-times/date/:date` | Get all tee times for a specific date       |
| POST   | `/api/tee-times`            | Create a new tee time                       |
| PUT    | `/api/tee-times/:id`        | Update a tee time by ID                     |
| DELETE | `/api/tee-times/:id`        | Delete a tee time by ID                     |
| POST   | `/api/tee-times/scrape`     | Scrape tee times from a golf course website |

### Scraping Tee Times

To scrape tee times from a golf course website, send a POST request to `/api/tee-times/scrape` with the following body:

```json
{
    "url": "https://commonground-golf-course.book.teeitup.com/",
    "date": "2023-06-15"
}
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run linting
npm run lint

# Format code
npm run format
```

## Web Scraper CLI

The project includes a command-line tool for scraping tee times:

```bash
# Run the tee time scraper CLI
npx ts-node src/libs/teeScraperCli.ts --url=https://example-golf.com --date=2023-06-15
```

Options:

- `--url`: URL of the golf course website (defaults to Common Ground Golf Course)
- `--date`: Date to scrape tee times for in YYYY-MM-DD format (defaults to today)
- `--help`: Show help information

## Project Structure

```
backend/
├── prisma/              # Prisma schema and migrations
├── src/
│   ├── app/
│   │   ├── controllers/ # Request handlers
│   │   ├── entities/    # Data models
│   │   ├── helpers/     # Utility functions
│   │   ├── repositories/# Data access layer
│   │   ├── routes/      # API routes
│   │   └── services/    # Business logic
│   ├── libs/            # Standalone libraries (e.g., web scraper)
│   ├── assembly.ts      # Dependency injection
│   ├── app.ts           # Express application setup
│   ├── constants.ts     # Application constants
│   └── server.ts        # Server entry point
└── tests/               # Test files
```
