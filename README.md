# AI Mock Interviewer

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![Status](https://img.shields.io/badge/status-work%20in%20progress-yellow)

A web app that generates tailored interview questions from a job description and gives structured AI feedback on your answers. Built with React, Node.js, and the Claude API.

> Work in progress — the polished README (with screenshots, architecture diagram, and demo link) will land once the features are complete.

## Stack
- **Frontend:** React (Vite) + Tailwind + shadcn/ui — deployed to Vercel
- **Backend:** Node.js + Express — deployed to Railway
- **AI:** Anthropic Claude API (Sonnet 4.6)

## Local development

You'll need Node.js 20+ installed and an Anthropic API key from <https://console.anthropic.com/>.

### One-time setup

```bash
git clone https://github.com/AbdullAdil/AI-Mock-Interviewer-.git
cd AI-Mock-Interviewer-

# Add your API key
cp server/.env.example server/.env
# Then edit server/.env and paste your ANTHROPIC_API_KEY

# Install all dependencies (root, client, server)
npm run install:all
```

### Run it

```bash
npm run dev
```

That starts both the backend (http://localhost:3001) and the frontend (http://localhost:5173) in one terminal, with prefixed log output so you can tell which is which. The Vite dev server proxies `/api/*` to the backend, so no extra config is needed.

## Project layout

```
client/   React + Vite frontend (deployed to Vercel)
server/   Express backend that talks to the Claude API (deployed to Railway)
```

See [`client/src`](./client/src) and [`server/src`](./server/src) for the source.
