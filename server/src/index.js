// Express entrypoint. Loads .env, configures CORS, mounts the two API routes,
// and starts the HTTP server.

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import questionsRouter from './routes/questions.js'
import feedbackRouter from './routes/feedback.js'

const app = express()
const PORT = process.env.PORT || 3001

// Allow the frontend to call us. CLIENT_ORIGIN can be a comma-separated list
// so we can permit both the local Vite dev server and the deployed Vercel URL.
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())

app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '1mb' })) // job descriptions can be a few KB; 1MB is generous headroom

// Health check — useful for Railway's uptime probes and quick "is it alive?" tests.
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'ai-mock-interviewer' })
})

app.use('/api/questions', questionsRouter)
app.use('/api/feedback', feedbackRouter)

// Centralised error handler — anything a route calls `next(err)` with ends up here,
// so individual routes don't each need their own try/catch boilerplate for shape.
app.use((err, req, res, _next) => {
  console.error('[server] unhandled error:', err)
  res.status(500).json({ error: err.message || 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`)
})
