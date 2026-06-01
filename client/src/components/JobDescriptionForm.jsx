import { useState } from 'react'
import { generateQuestions } from '@/api/client'

// Screen 1: the user pastes a job description and clicks Start.
// On submit we call the backend, then hand the JD + generated questions
// up to <App /> so it can switch screens.
export default function JobDescriptionForm({ onStart }) {
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { questions } = await generateQuestions(jobDescription)
      onStart({ jobDescription, questions })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="jd" className="block text-sm font-medium mb-2">
          Paste a job description
        </label>
        <textarea
          id="jd"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="e.g. Software Engineering Intern at Acme. We're looking for..."
          rows={12}
          required
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={loading || !jobDescription.trim()}
        className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Generating questions…' : 'Start interview'}
      </button>
    </form>
  )
}
