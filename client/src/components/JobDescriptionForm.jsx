import { useState } from 'react'
import { generateQuestions } from '@/api/client'
import Spinner from './Spinner'

// A realistic, polished sample job description so visitors can demo the app
// in one click without having to paste their own. Lifted from real Stripe-style
// internship postings — has both technical and behavioural hooks so the
// generated questions feel substantive.
const SAMPLE_JOB_DESCRIPTION = `Frontend Engineering Intern — Stripe

We're hiring Summer 2026 interns to join our Developer Experience team.

What you'll work on:
- Improving the Stripe Dashboard UX for our developer users
- Building reusable React components used across 20+ internal tools
- Collaborating with backend engineers to shape API ergonomics

We're looking for someone who:
- Has built non-trivial React projects (school or personal)
- Is comfortable with TypeScript and modern frontend tooling
- Can write thoughtful, readable code and explain their tradeoffs
- Cares deeply about UX, accessibility, and design quality

Bonus points for experience with design systems, performance optimisation,
or open-source contributions.`

// Screen 1: the landing page. Shows the value prop, a how-it-works strip,
// and the job-description form. On submit, hits the backend for five
// tailored questions and hands them up to <App /> for the interview to begin.
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
    <div className="space-y-10">
      {/* Hero — the value prop. Recruiters / first-time visitors see this first. */}
      <section className="text-center space-y-3 pt-4">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Practice for your next interview
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Paste a job description, answer five tailored questions, and get
          structured AI feedback on every answer in seconds.
        </p>
      </section>

      {/* Three-step explainer. Keeps the "what does this thing do" question
          answered without anyone needing to read paragraphs. */}
      <section className="grid sm:grid-cols-3 gap-4">
        <Step
          number={1}
          title="Paste a JD"
          body="Any role, any company. Questions are generated from what's actually in the description."
        />
        <Step
          number={2}
          title="Answer five questions"
          body="A tailored mix of behavioural and technical — like a real screening round."
        />
        <Step
          number={3}
          title="Get feedback"
          body="See what you did well, what was missing, and a stronger sample answer."
        />
      </section>

      {/* The actual form. */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex justify-between items-end">
          <label htmlFor="jd" className="text-sm font-medium">
            Job description
          </label>
          <button
            type="button"
            onClick={() => setJobDescription(SAMPLE_JOB_DESCRIPTION)}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Try a sample
          </button>
        </div>
        <textarea
          id="jd"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="e.g. Software Engineering Intern at Acme. We're looking for..."
          rows={12}
          required
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={loading || !jobDescription.trim()}
          className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && <Spinner />}
          {loading ? 'Generating questions…' : 'Start interview'}
        </button>
      </form>
    </div>
  )
}

// Local presentational helper for the how-it-works strip.
function Step({ number, title, body }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-1">
      <div className="text-xs font-semibold text-muted-foreground">STEP {number}</div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{body}</p>
    </div>
  )
}
