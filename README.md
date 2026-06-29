# AI Mock Interviewer

Generates a five-question mock interview from any job description, with structured feedback from Claude on each answer.

**Live:** [ai-mock-interviewer-one-theta.vercel.app](https://ai-mock-interviewer-one-theta.vercel.app)

## Why

Most interview prep tools recycle the same generic question banks. I wanted something that reads the actual job description and asks questions tailored to that role, so practising feels less like memorising a prep book and more like a real screening round.

## How it works

You paste a job description. The app generates five questions, mixing behavioural and technical based on what the role calls for. You answer each one in a text box, and after each submission Claude returns three things: what your answer did well, what it missed, and a stronger sample answer to compare against. At the end you get the whole interview as a scrollable recap.

## Stack

- React (Vite) + Tailwind on the frontend, deployed to Vercel
- Node + Express on the backend, deployed to Railway
- Anthropic's Claude (Sonnet 4.6) does the actual generation

The frontend never talks to Claude directly. The backend owns the API key and the prompts and exposes two endpoints (`/api/questions`, `/api/feedback`). That keeps the secret off the client, and lets me iterate on prompt wording without rebuilding the UI.

## Running locally

You need Node 20+ and an Anthropic API key from <https://console.anthropic.com/>.

```bash
git clone https://github.com/AbdullAdil/AI-Mock-Interviewer-.git
cd AI-Mock-Interviewer-

cp server/.env.example server/.env
# then edit server/.env and paste your ANTHROPIC_API_KEY

npm run install:all
npm run dev
```

Backend runs on `:3001`, frontend on `:5173`. The Vite dev server proxies `/api/*` so there's no CORS setup needed locally.

## License

MIT.
