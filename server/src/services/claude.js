// Thin wrapper around the Anthropic SDK. Every Claude call in the app goes
// through here so we have one place to change the model, add retries, log usage, etc.

import Anthropic from '@anthropic-ai/sdk'

// Warn loudly at boot if the key is missing — much clearer than a cryptic 500 on first request.
if (!process.env.ANTHROPIC_API_KEY) {
  console.warn('[claude] ANTHROPIC_API_KEY is not set. API calls will fail until you set it in .env')
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Sonnet 4.6 is the sweet spot for this app: good reasoning, fast, much cheaper than Opus.
// If we ever want sharper feedback we can pass `model: 'claude-opus-4-7'` per-call.
const DEFAULT_MODEL = 'claude-sonnet-4-6'

// Send a single-turn request to Claude and return the assistant text content.
// We deliberately use single-turn (no conversation history) because each request
// in this app is independent (generate questions OR critique one answer).
export async function callClaude({ system, userMessage, maxTokens = 2048, model = DEFAULT_MODEL }) {
  const response = await client.messages.create({
    model,
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: userMessage }],
  })

  // Claude returns an array of content blocks. For text responses there's a single
  // text block. Grab it; if for some reason there's none, fail loudly.
  const textBlock = response.content.find((block) => block.type === 'text')
  if (!textBlock) {
    throw new Error('Claude returned no text content')
  }
  return textBlock.text
}
