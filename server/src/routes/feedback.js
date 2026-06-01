// POST /api/feedback
// Returns structured feedback on a single answer to a single question.
//
// Request body:  { jobDescription, question, answer } — all strings
// Response body: { strengths: string[], gaps: string[], sampleAnswer: string }

import { Router } from 'express'
import { callClaude } from '../services/claude.js'
import { buildFeedbackPrompt } from '../prompts/feedbackGeneration.js'

const router = Router()

router.post('/', async (req, res, next) => {
  try {
    const { jobDescription, question, answer } = req.body
    if (!jobDescription || !question || !answer) {
      return res.status(400).json({
        error: 'jobDescription, question, and answer are all required',
      })
    }

    const { system, user } = buildFeedbackPrompt({ jobDescription, question, answer })
    const raw = await callClaude({ system, userMessage: user })

    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch {
      console.error('[feedback] failed to parse Claude response:', raw)
      throw new Error('Failed to parse feedback from Claude response')
    }

    // Default each field defensively so the frontend never sees `undefined`.
    res.json({
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      gaps: Array.isArray(parsed.gaps) ? parsed.gaps : [],
      sampleAnswer: typeof parsed.sampleAnswer === 'string' ? parsed.sampleAnswer : '',
    })
  } catch (err) {
    next(err)
  }
})

export default router
