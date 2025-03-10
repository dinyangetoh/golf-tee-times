# TEE TIME SCRAPER

Build a simple web scraper and website using Typescript, NodeJS and SvelteKit (v4 if possible) that demonstrates Docker-based PostgreSQL integration, API development, frontend component creation, state management, and web scraping.

### Requirements:

- Please include a helpful and clear README.md file that explains your technical choices, what you would do if you had more time, and how to run your code.

### Docker-Postgres Setup:

- Create a Docker Compose file that spins up a PostgreSQL container.
- Provide a script or instructions to initialize the database with a table for tee_times (fields: id, time, price, min_players, max_players, holes).

### Web Scraping:

- Scrape the tee times off of a single day from this course: https://commonground-golf-course.book.teeitup.com/
- Make sure to scrape ALL 9 and 18 hole tee times
- Save the tee times to the database
- Make sure the code doesn't create duplicates if the scraper is run multiple times, it should update existing tee times (i.e. upsert)
- You can make this a separate script that can be run via the command line if you’d like. Please include in the README.md file how to run the script.

### Backend API:

- Develop RESTful endpoints in SvelteKit for tee time CRUD operations (create, read, update, delete).
- Connect the API to the Postgres DB.
- Your scraper can use this API, or it can connect to the database directly.

### Frontend Components & State Management:

- Build a SvelteKit page that displays the tee times using SSR, but ensure the frontend supports CRUD using the API.
- The page should be able to edit and delete tee times.
- Use Svelte’s reactive state (stores or reactive variables) to reflect any changes to the tee times.

### Time Estimate:

- There is no deadline, complete this at your own pace.
- Please aim to spend no more than 3 hours on this task. I don’t want to waste your time.

### Submission:

Please push this to a public GitHub repo and share it with me.
