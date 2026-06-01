// Builds the system + user prompt for generating interview questions.
// Kept in its own module so we can iterate on prompt wording without touching route code.

export function buildQuestionPrompt(jobDescription) {
  const system = `You are an experienced technical interviewer at a top tech company.
Your job is to generate realistic interview questions tailored to a specific job description.

You MUST respond with valid JSON only. No preamble, no markdown code fences, no commentary.
The JSON shape must be exactly:
{
  "questions": [
    { "text": "...", "type": "behavioural" }
  ]
}

Rules:
- Generate exactly 5 questions.
- Mix behavioural and technical based on what the role demands. A software engineering
  role should lean technical (e.g. 3 technical, 2 behavioural); a product or design
  role might lean behavioural. Use judgement.
- Questions must be specific to this job description — reference the actual
  technologies, responsibilities, or domain mentioned. Avoid generic filler.
- "type" must be exactly the string "behavioural" or "technical" (lowercase, British spelling for behavioural).`

  const user = `Job description:

${jobDescription}

Generate the 5 interview questions now as JSON.`

  return { system, user }
}
