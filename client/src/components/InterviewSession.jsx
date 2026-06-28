import { useState } from 'react'
import QuestionCard from './QuestionCard'
import AnswerInput from './AnswerInput'
import FeedbackPanel from './FeedbackPanel'
import InterviewRecap from './InterviewRecap'
import { getFeedback } from '@/api/client'

// Screen 2: orchestrates the question → answer → feedback → next-question loop,
// then renders the full recap when all questions are done.
//
// Holds:
//   - currentIndex: which question we're on
//   - answer / feedback: state for the question in flight
//   - history: accumulated [{ question, answer, feedback }] for the recap screen
export default function InterviewSession({ jobDescription, questions, onRestart }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [history, setHistory] = useState([])
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

  // Save the completed Q/A/feedback into history, then advance to the next question
  // (or trip isFinished and render the recap).
  function handleNext() {
    setHistory([...history, { question: currentQuestion, answer, feedback }])
    setCurrentIndex(currentIndex + 1)
    setAnswer('')
    setFeedback(null)
    setError(null)
  }

  // End of the interview — show the full recap of every Q/A/feedback.
  if (isFinished) {
    return <InterviewRecap history={history} onRestart={onRestart} />
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
