import { useState } from 'react'
import QuestionCard from './QuestionCard'
import AnswerInput from './AnswerInput'
import FeedbackPanel from './FeedbackPanel'
import { getFeedback } from '@/api/client'

// Screen 2: orchestrates the question → answer → feedback → next-question loop.
// Holds the index of the current question and the feedback for the answer in flight.
export default function InterviewSession({ jobDescription, questions, onRestart }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const isFinished = currentIndex >= questions.length
  const currentQuestion = isFinished ? null : questions[currentIndex]
  const isLast = currentIndex === questions.length - 1

  async function handleSubmitAnswer() {
    setError(null)
    setLoading(true)
    try {
      const result = await getFeedback({
        jobDescription,
        question: currentQuestion.text,
        answer,
      })
      setFeedback(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Advance to the next question, resetting answer + feedback state.
  function handleNext() {
    setCurrentIndex(currentIndex + 1)
    setAnswer('')
    setFeedback(null)
    setError(null)
  }

  // End-of-interview screen.
  if (isFinished) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Interview complete</h2>
        <p className="text-muted-foreground">
          You answered all {questions.length} questions. Want another go?
        </p>
        <button
          onClick={onRestart}
          className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          Start a new interview
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>
          Question {currentIndex + 1} of {questions.length}
        </span>
        <button onClick={onRestart} className="underline hover:text-foreground">
          Start over
        </button>
      </div>

      <QuestionCard question={currentQuestion} />

      {/* Two-phase UI:
          - Before feedback: show the answer textarea + submit button.
          - After feedback: show the feedback panel + next-question button. */}
      {!feedback ? (
        <AnswerInput
          value={answer}
          onChange={setAnswer}
          onSubmit={handleSubmitAnswer}
          loading={loading}
        />
      ) : (
        <>
          <FeedbackPanel feedback={feedback} />
          <button
            onClick={handleNext}
            className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            {isLast ? 'Finish' : 'Next question'}
          </button>
        </>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
