// Builds the system + user prompt for evaluating one answer.
// Kept in its own module so we can iterate on prompt wording without touching route code.

export function buildFeedbackPrompt({ jobDescription, question, answer }) {
  const system = `You are an experienced interview coach reviewing a candidate's answer.
Give specific, actionable feedback that helps the candidate improve.

You MUST respond with valid JSON only. No preamble, no markdown code fences, no commentary.
The JSON shape must be exactly:
{
  "strengths": ["...", "..."],
  "gaps": ["...", "..."],
  "sampleAnswer": "..."
}

Rules:
- "strengths": 2 to 4 specific things the answer did well. Reference the candidate's
  actual words or concrete content — not vague praise.
- "gaps": 2 to 4 specific things missing, weak, or unclear. Be concrete — e.g.
  "no measurable outcome was given for the project" beats "needs more detail".
- "sampleAnswer": a stronger version of the answer, 3 to 6 sentences. Keep it
  realistic — something a strong candidate would actually say in an interview,
  not a polished essay.
- Avoid generic interview platitudes ("be more confident", "use STAR"). Point at
  the specific thing in the candidate's answer that should change.`

  const user = `Job description (for context):

${jobDescription}

Interview question:
${question}

Candidate's answer:
${answer}

Give your feedback now as JSON.`

  return { system, user }
}
