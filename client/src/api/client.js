// Tiny fetch wrapper for talking to the backend.
// In development VITE_API_URL is empty and Vite proxies /api/* to localhost:3001.
// In production we set VITE_API_URL to the Railway URL at Vercel build time.

const API_BASE = import.meta.env.VITE_API_URL || ''

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    // Pull whatever error text the backend sent so the UI can surface it.
    const text = await res.text()
    throw new Error(`Request failed (${res.status}): ${text}`)
  }
  return res.json()
}

// Generate 5 interview questions tailored to a job description.
// Returns { questions: [{ id, text, type }, ...] }.
export function generateQuestions(jobDescription) {
  return request('/api/questions', {
    method: 'POST',
    body: JSON.stringify({ jobDescription }),
  })
}

// Get structured feedback on one answer to one question.
// Returns { strengths, gaps, sampleAnswer }.
export function getFeedback({ jobDescription, question, answer }) {
  return request('/api/feedback', {
    method: 'POST',
    body: JSON.stringify({ jobDescription, question, answer }),
  })
}
