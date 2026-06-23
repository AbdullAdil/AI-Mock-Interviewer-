import Spinner from './Spinner'

// Controlled textarea for the candidate's answer, plus a submit button.
// Parent owns the value so it can reset between questions.
export default function AnswerInput({ value, onChange, onSubmit, loading }) {
  return (
    <div className="space-y-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer here…"
        rows={8}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <button
        onClick={onSubmit}
        disabled={loading || !value.trim()}
        className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading && <Spinner />}
        {loading ? 'Getting feedback…' : 'Submit answer'}
      </button>
    </div>
  )
}
