// Colour-coded pill badge that shows whether a question is behavioural or
// technical. Used in QuestionCard (the live interview) and InterviewRecap
// (the end-of-session summary) so the visual treatment stays consistent.
//
// Behavioural = blue (people / communication / situational)
// Technical   = purple (depth / problem-solving)
export default function TypeBadge({ type }) {
  const isBehavioural = type === 'behavioural'

  const styles = isBehavioural
    ? 'bg-blue-50 text-blue-700 border-blue-200'
    : 'bg-purple-50 text-purple-700 border-purple-200'

  // The API returns lowercase ("behavioural" / "technical"); capitalise for display.
  const label = type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Unknown'

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${styles}`}
    >
      {label}
    </span>
  )
}
