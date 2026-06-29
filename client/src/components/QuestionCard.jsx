import TypeBadge from './TypeBadge'

// Displays one interview question with a colour-coded badge showing whether
// it's behavioural or technical. Purely presentational.
export default function QuestionCard({ question }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-3">
      <TypeBadge type={question.type} />
      <p className="text-lg leading-relaxed">{question.text}</p>
    </div>
  )
}
