import { useState } from 'react'
import JobDescriptionForm from '@/components/JobDescriptionForm'
import InterviewSession from '@/components/InterviewSession'

// Top-level component. Two screens:
//   1. The JD entry form (shown when no questions have been generated).
//   2. The active interview session (shown once questions exist).
// All state lives here in memory — refreshing the page resets everything (stateless app).
export default function App() {
  // The job description the user pasted; we keep it around because feedback
  // requests need it for context, not just questions.
  const [jobDescription, setJobDescription] = useState('')

  // null = haven't started yet; array = generated questions.
  const [questions, setQuestions] = useState(null)

  // Called by JobDescriptionForm once /api/questions returns successfully.
  function handleStart({ jobDescription: jd, questions: qs }) {
    setJobDescription(jd)
    setQuestions(qs)
  }

  // Reset back to the JD entry screen.
  function handleRestart() {
    setJobDescription('')
    setQuestions(null)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold">AI Mock Interviewer</h1>
          <p className="text-sm text-muted-foreground">
            Practice interview questions tailored to any job description.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {questions === null ? (
          <JobDescriptionForm onStart={handleStart} />
        ) : (
          <InterviewSession
            jobDescription={jobDescription}
            questions={questions}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  )
}
