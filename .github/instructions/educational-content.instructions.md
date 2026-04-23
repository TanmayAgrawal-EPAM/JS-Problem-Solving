---
description: "Use when creating or editing Markdown learning content for coding topics, especially JavaScript, coding practices, and problem-solving guidance. Prioritize clarity, confidence-building, and psychologically effective learning structure."
name: "Educational Content Writing Standards"
applyTo: "**/*learning*.md, **/*guide*.md, **/*tutorial*.md, **/*notes*.md, **/prototype-*.md"
---

# Educational Content Writing Standards

## Goal
Produce learning content that helps students learn faster, retain concepts longer, and build high confidence while applying coding practices in real scenarios.
These standards are strict requirements unless the user explicitly overrides them for a specific task.

## Audience And Tone
- Write for learners from beginner to early-intermediate level unless the prompt says otherwise.
- Use clear, direct language with short paragraphs and high signal-to-noise.
- Be supportive and confidence-building without overpromising outcomes.
- Avoid vague motivational filler; every section must teach something practical.

## Core Learning Structure (Psychology-Grounded)
Use this sequence by default:
1. Outcome Preview: Start with what the learner will be able to do after reading.
2. Prior Knowledge Bridge: Connect new concepts to what learners likely already know.
3. Chunking: Break content into small, named sections with one core idea each.
4. Worked Example: Show one complete, realistic example before advanced variants.
5. Guided Practice: Add small tasks with hints, then expected outputs or checkpoints.
6. Retrieval Prompt: Include short recall questions after major sections.
7. Common Mistakes: Show likely errors, why they happen, and how to debug them.
8. Transfer Step: End with one challenge that applies the concept to a new context.

## Writing Quality Standards
- Define terms the first time they appear.
- Prefer concrete examples over abstract explanation.
- Use progressive disclosure: simple case first, edge cases later.
- Keep headings informative, not generic.
- Keep lists scannable and focused.
- Add concise summaries at section boundaries when complexity increases.

## JavaScript-Specific Standards
- Prefer modern JavaScript syntax and current best practices.
- Distinguish runtime context when relevant (Node.js vs browser).
- Explain behavior of key JavaScript concepts with examples: scope, this, prototypes, async flow, and error handling.
- Include practical debugging guidance (what to inspect, expected vs actual behavior).
- Highlight trade-offs, not just rules (for example, class syntax vs prototype patterns).

## Problem-Solving Instruction Pattern
When teaching problem solving, follow this format:
1. Problem Framing: Inputs, outputs, constraints.
2. Strategy Selection: Why this approach fits.
3. Stepwise Implementation: Build solution in small validated steps.
4. Complexity And Trade-offs: Time and space reasoning where relevant.
5. Validation: Test with normal, edge, and failure cases.

## Markdown Formatting Rules
- Use clear heading hierarchy.
- Prefer short code blocks with comments only when necessary.
- Label expected output after code examples when useful.
- Use tables only when comparison improves understanding.
- End with a short recap and 2-3 next-practice suggestions.

## Quality Checklist Before Finalizing
- Is the main learning outcome explicit in the first section?
- Are explanations easy to follow without hidden assumptions?
- Is at least one realistic JavaScript example included when topic is coding-related?
- Are common errors and debugging tips included?
- Are there retrieval or practice prompts that reinforce learning?
- Is the content concise, structured, and confidence-building?
