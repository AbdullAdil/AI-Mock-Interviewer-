import TypeBadge from './TypeBadge'

// End-of-interview recap. Replaces the previous bare "complete" screen
// with a full scrollable summary of every question, the user's answer,
// and the feedback they got. Designed to feel like a deliverable the user
// could read back, screenshot, or paste into a doc.

export default function InterviewRecap({ history, onRestart }) {
  return (
    <div className="space-y-8">
      {/* Celebration header */}
      <section className="text-center space-y-2 pt-2">
        <h2 className="text-3xl font-bold tracking-tight">Interview complete</h2>
        <p className="text-muted-foreground">
          Here's the full recap of all {history.length} questions and the feedback on each.
        </p>
      </section>

      {/* Per-question recap blocks */}
      <ol className="space-y-8">
        {history.map((entry, index) => (
          <RecapEntry key={index} index={index} entry={entry} />
        ))}
      </ol>

      {/* Restart CTA */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onRestart}
          className="rounded-md bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:opacity-90"
        >
          Start a new interview
        </button>
      </div>
    </div>
  )
}

// One question's worth of recap: the question, the user's answer, the AI feedback.
// Visually grouped under a numbered heading so the user can skim by question.
function RecapEntry({ index, entry }) {
  const { question, answer, feedback } = entry

  return (
    <li className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-muted-foreground">
          Question {index + 1}
        </span>
        <TypeBadge type={question.type} />
      </div>

      {/* The question itself */}
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-base">{question.text}</p>
      </div>

      {/* What the user answered */}
      <div className="rounded-lg border border-border bg-muted/40 p-4">
        <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          Your answer
        </h3>
        <p className="text-sm whitespace-pre-wrap">{answer}</p>
      </div>

      {/* The feedback Claude gave */}
      <div className="space-y-2">
        <FeedbackList
          title="What was good"
          items={feedback.strengths}
          accentClass="border-l-4 border-l-green-500"
        />
        <FeedbackList
          title="What was missing"
          items={feedback.gaps}
          accentClass="border-l-4 border-l-yellow-500"
        />
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
            Sample stronger answer
          </h3>
          <p className="text-sm whitespace-pre-wrap text-muted-foreground">
            {feedback.sampleAnswer}
          </p>
        </div>
      </div>
    </li>
  )
}

// Coloured-accent card for strengths / gaps. Mirrors the in-flight FeedbackPanel
// look so the recap feels visually consistent with the live interview screen.
function FeedbackList({ title, items, accentClass }) {
  return (
    <div className={`rounded-lg border border-border bg-card p-4 ${accentClass}`}>
      <h3 className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
        {title}
      </h3>
      <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
