# AI Mock Interviewer

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://ai-mock-interviewer-one-theta.vercel.app)

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![Status](https://img.shields.io/badge/status-deployed-success)

A web app that generates tailored interview questions from a job description and gives structured AI feedback on your answers. Built with React, Node.js, and the Claude API.

**🌐 Try it now:** <https://ai-mock-interviewer-one-theta.vercel.app>

## How it works

1. Paste a job description
2. The app generates 5 tailored interview questions (mix of behavioural and technical)
3. Type your answer to each question
4. Claude gives you structured feedback — what was good, what was missing, and a stronger sample answer

## Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  React (Vite)   │ ───▶ │  Node + Express │ ───▶ │  Claude API     │
│  on Vercel      │      │  on Railway     │      │  (Anthropic)    │
└─────────────────┘      └─────────────────┘      └─────────────────┘
   user's browser           your backend            Anthropic's cloud
```

The backend holds the API key and prompts Claude on the frontend's behalf — keeping secrets server-side and making the prompts easy to iterate without redeploying the UI.

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
