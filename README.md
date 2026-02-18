# Docker Node + PostgreSQL Demo

A simple multi-container application using Docker Compose.
The Node.js web app connects to a PostgreSQL database and displays a persistent visit counter.

---

## Architecture

Services:

* web → Node.js + Express (port 3000)
* db → PostgreSQL 15

Networking:

* Docker Compose automatically creates a private network.
* The web container connects to Postgres using:

  `host: "db"`

The service name (`db`) acts as the hostname inside the Docker network.

---

## Volume Mounting

### Named Volume (Persistent Database Storage)

In docker-compose.yml:

* `db-data:/var/lib/postgresql/data`

* `db-data` is Docker-managed.

* `/var/lib/postgresql/data` is the Postgres data directory inside the container.

* Data survives container restarts.

Reset the database completely:

`docker compose down -v`

---

### Bind Mount (Development Workflow)

In docker-compose.yml:

* `.:/app`

* Mounts the project directory into the container.

* Allows live editing without rebuilding the image.

---

## Running The Project

Build and start:

`docker compose up --build`

Stop containers:

`docker compose down`

Clean rebuild:

`docker compose down -v`
`docker compose build --no-cache`
`docker compose up`

Open in browser:

`http://localhost:3000`

Each refresh inserts a row into Postgres and increments the visit counter.

---

## Query Postgres Inside The Container

Open psql using Docker Compose:

`docker compose exec db psql -U user -d mydb`

Or using Docker directly:

`docker exec -it demo-postgres psql -U user -d mydb`

Useful SQL commands inside psql:

`\dt`
`SELECT * FROM visitors;`
`SELECT COUNT(*) FROM visitors;`
`\q`

---

## Screenshots

Screenshots are stored in the media/ folder.

### App 
![App Screenshot](./media/page.png)

### Database query
![Database Query](./media/postgres_container.png)

---

## Concepts Demonstrated

* Multi-container architecture
* Docker networking via service names
* Named volumes for persistence
* Bind mounts for development
* Containerized database interaction


