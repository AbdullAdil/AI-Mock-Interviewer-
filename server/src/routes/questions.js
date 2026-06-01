// POST /api/questions
// Generates 5 tailored interview questions from a job description.
//
// Request body:  { jobDescription: string }
// Response body: { questions: [{ id, text, type }, ...] }
//   - type is "behavioural" or "technical"

import { Router } from 'express'
import { callClaude } from '../services/claude.js'
import { buildQuestionPrompt } from '../prompts/questionGeneration.js'

const router = Router()

router.post('/', async (req, res, next) => {
  try {
    const { jobDescription } = req.body
    if (!jobDescription || typeof jobDescription !== 'string') {
      return res.status(400).json({ error: 'jobDescription (string) is required' })
    }

    const { system, user } = buildQuestionPrompt(jobDescription)
    const raw = await callClaude({ system, userMessage: user })

    // The prompt instructs Claude to return JSON only. If parsing fails it usually
    // means the model wrapped the JSON in markdown fences or added preamble — we
    // surface a clear error so the prompt can be tightened.
    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch {
      console.error('[questions] failed to parse Claude response:', raw)
      throw new Error('Failed to parse questions from Claude response')
    }

    if (!Array.isArray(parsed.questions)) {
      throw new Error('Claude response missing `questions` array')
    }

    // Attach a stable id to each question — React needs it for list keys, and
    // it gives us a handle if we later want to reference questions on the backend.
    const questions = parsed.questions.map((q, i) => ({
      id: `q-${i + 1}`,
      text: q.text,
      type: q.type,
    }))

    res.json({ questions })
  } catch (err) {
    next(err)
  }
})

export default router
