# Frontend Development Plan

- should be a SvelteKit app
- should select Svelte v4 with typescript
- should be a SvelteKit page that displays the tee times using SSR, but ensure the frontend supports CRUD using the API.
- should use tailwind css for styling
- should support basic endpoint for listing, creating, updating and deleting tee times
- show all tee times on the homepage
- should filter tee times by date

## API Endpoints

### Tee Time Management

| Method | Endpoint                    | Description                           |
| ------ | --------------------------- | ------------------------------------- |
| GET    | `/api/tee-times`            | Get all tee times                     |
| GET    | `/api/tee-times/:id`        | Get a tee time by ID                  |
| GET    | `/api/tee-times/date/:date` | Get all tee times for a specific date |
| POST   | `/api/tee-times`            | Create a new tee time                 |
| PUT    | `/api/tee-times/:id`        | Update a tee time by ID               |
| DELETE | `/api/tee-times/:id`        | Delete a tee time by ID               |
