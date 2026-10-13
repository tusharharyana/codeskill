# Run CodeSkill locally

Start the project in three terminals from the repository root.

## Terminal 1 — database and cache

```bash
cd /home/tusharharyana/Downloads/codeSkill
docker compose up -d postgres redis
```

## Terminal 2 — backend API

```bash
cd /home/tusharharyana/Downloads/codeSkill/backend-nestjs
npm install # only needed once, or after package.json changes
npm run start:dev
```

The API listens on `http://localhost:5001`; health check: `http://localhost:5001/api/health`.

## Terminal 3 — frontend

```bash
cd /home/tusharharyana/Downloads/codeSkill/frontend-v2
npm install # only needed once, or after package.json changes
npm run dev
```

Open `http://localhost:3000/login`. Sign in with your existing admin or student account. Use `Ctrl+C` in the backend and frontend terminals to stop them; `docker compose stop postgres redis` stops the data services.

For production schema changes, run the project's TypeORM migrations before deploying. Local development uses TypeORM synchronization as configured by the backend environment.
