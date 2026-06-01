# AI Mock Interviewer

A web app that generates tailored interview questions from a job description and gives structured AI feedback on your answers. Built with React, Node.js, and the Claude API.

> Work in progress — the polished README (with screenshots, architecture diagram, and demo link) will land once the features are complete.

## Stack
- **Frontend:** React (Vite) + Tailwind + shadcn/ui — deployed to Vercel
- **Backend:** Node.js + Express — deployed to Railway
- **AI:** Anthropic Claude API (Sonnet 4.6)

## Local development

You'll need Node.js 20+ installed and an Anthropic API key from <https://console.anthropic.com/>.

### 1. Backend

```bash
cd server
cp .env.example .env       # then paste your ANTHROPIC_API_KEY into .env
npm install
npm run dev                # starts on http://localhost:3001
```

### 2. Frontend (in a separate terminal)

```bash
cd client
npm install
npm run dev                # opens http://localhost:5173
```

The Vite dev server proxies `/api/*` to the backend, so no extra config is needed for local development.

## Project layout

```
client/   React + Vite frontend (deployed to Vercel)
server/   Express backend that talks to the Claude API (deployed to Railway)
```

See [`client/src`](./client/src) and [`server/src`](./server/src) for the source.
