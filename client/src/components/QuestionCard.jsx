// Displays one interview question with a small badge showing whether it's
// behavioural or technical. Purely presentational.
export default function QuestionCard({ question }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-3">
      <span className="inline-block text-xs uppercase tracking-wide text-muted-foreground">
        {question.type}
      </span>
      <p className="text-lg leading-relaxed">{question.text}</p>
    </div>
  )
}
