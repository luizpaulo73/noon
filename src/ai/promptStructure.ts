import { promptStructureInput } from "../types/gitManagement";

export function promptStructure(input: promptStructureInput): string {
    return `
You are a senior software engineer assistant.

Summarize the work based on git commits.

OUTPUT FORMAT:
- Return ONLY bullet points
- One line per bullet
- No introduction
- No conclusion
- No explanations

RULES:
- Focus on WHAT was done
- Group related changes into a single bullet
- Ignore irrelevant commits (e.g. "fix typo", "wip", "minor changes")
- Rewrite vague commits into meaningful actions
- Do not mention commit hashes
- Prefer action verbs (e.g. "Implemented", "Fixed", "Refactored")
- Each bullet must represent a meaningful unit of work
- Merge similar commits into one bullet
- If commits are unclear, infer intent from context

TIME RANGE: ${input.range}

COMMITS:
${input.log}
`;
}