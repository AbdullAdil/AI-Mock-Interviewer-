// Renders the structured AI feedback in three sections:
//   - Strengths (green accent)
//   - Gaps     (yellow accent)
//   - Sample stronger answer (plain card)

export default function FeedbackPanel({ feedback }) {
  return (
    <div className="space-y-4">
      <FeedbackSection
        title="What was good"
        items={feedback.strengths}
        accentClass="border-l-4 border-l-green-500"
      />
      <FeedbackSection
        title="What was missing"
        items={feedback.gaps}
        accentClass="border-l-4 border-l-yellow-500"
      />
      <div className="rounded-lg border border-border bg-card p-4 space-y-2">
        <h3 className="text-sm font-semibold">Sample stronger answer</h3>
        <p className="text-sm whitespace-pre-wrap text-muted-foreground">
          {feedback.sampleAnswer}
        </p>
      </div>
    </div>
  )
}

// Local presentational helper — a card with a coloured left border and a bullet list.
function FeedbackSection({ title, items, accentClass }) {
  return (
    <div className={`rounded-lg border border-border bg-card p-4 space-y-2 ${accentClass}`}>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
