SYNAPSE MED — ADMIN UI
PROMPT #10 — QUIZ EDITOR

Design the Quiz Editor for the SYNAPSE MED Admin Console.

The approved SYNAPSE MED Admin App Shell and Design System are immutable.

==================================================
1. PRODUCT PURPOSE
==================================================

The Quiz Editor allows an authorized administrator to configure a Quiz
and manage its Questions.

The editor contains two conceptual areas:

Quiz Configuration

Questions

Do not turn this into a student-facing quiz experience.

==================================================
2. QUIZ STRUCTURE
==================================================

Quiz
│
├── Quiz Configuration
│
└── Questions
    ├── Question
    │   └── Answer Options
    ├── Question
    │   └── Answer Options
    └── ...

==================================================
3. QUIZ CONFIGURATION
==================================================

Only expose supported configuration fields.

The Quiz system supports:

- Passing Score
- Max Attempts

Use the actual data model.

Do not invent:

- Time Limit
- Randomization
- Negative Marking
- Difficulty
- Question Pool
- Shuffle Questions

unless explicitly supported.

==================================================
4. PASSING SCORE
==================================================

Use a standard numeric/percentage input according to the actual data model.

Label:

Passing Score

Provide validation appropriate to the supported range.

Do not invent the range if it is not defined.

==================================================
5. MAX ATTEMPTS
==================================================

Use a standard input/select according to the actual model.

Label:

Max Attempts

Do not invent unlimited behavior.

==================================================
6. QUESTION LIST
==================================================

Questions should appear as an ordered list.

Each question should communicate:

Order

Question text

Question type

Answer structure

Actions

Do not display unnecessary analytics.

==================================================
7. QUESTION TYPES
==================================================

The MVP supports:

Multiple Answer

True / False

Do not create additional question types.

Do not add:

Single Choice

Essay

Short Answer

Matching

Ordering

Image Hotspot

unless explicitly added to the product specification.

==================================================
8. QUESTION TYPE SELECTOR
==================================================

When creating/editing a question:

Provide a clear Question Type selector.

Options:

Multiple Answer

True / False

The selector must not contain unsupported types.

==================================================
9. MULTIPLE ANSWER
==================================================

A Multiple Answer question must provide answer options.

The UI should allow:

Answer text

Correct answer selection

Only if the actual product model supports these fields.

Correct answers must be visually distinct in the editor.

Do not make the editor look like the student-facing answer state.

==================================================
10. TRUE / FALSE
==================================================

For True/False:

The answer choices are:

True

False

The administrator must be able to define which answer is correct.

Do not create custom answer choices for this type.

==================================================
11. ANSWER OPTIONS
==================================================

Use a repeatable option pattern.

Example:

Option A

Option B

Option C

Option D

Only allow the number of options supported by the actual product model.

Do not invent an arbitrary maximum.

==================================================
12. CORRECT ANSWER
==================================================

Correct answer selection must be explicit.

Use:

Checkbox/radio-style selection

depending on the actual question type.

Do not use color alone to communicate correctness.

==================================================
13. ADD QUESTION
==================================================

Provide:

Add Question

Use the existing button system.

New questions should appear at the correct order position.

==================================================
14. QUESTION ORDER
==================================================

If reordering is supported:

Use a drag handle.

The order should be visually explicit.

Do not introduce drag-and-drop if the workflow does not support it.

==================================================
15. QUESTION EDITING
==================================================

Avoid making every question permanently expanded.

Preferred pattern:

Question row

↓

Expanded editor

This keeps the quiz manageable when many questions exist.

==================================================
16. QUESTION VALIDATION
==================================================

Validate only supported rules.

Examples:

Question text required

At least one correct answer

Required answer content

Only show validation messages when applicable.

Keep errors local to the question.

==================================================
17. SAVE MODEL
==================================================

Primary action:

Save Changes

Secondary:

Cancel

For creation:

Create Quiz

Do not add:

Save & Publish

unless supported.

==================================================
18. UNSAVED CHANGES
==================================================

If changes exist:

Show:

Unsaved changes

If the user attempts to leave:

Show a confirmation before losing changes.

Do not interrupt normal editing unnecessarily.

==================================================
19. SAVE STATES
==================================================

Support:

Default

Saving

Saved

Error

During save:

Saving...

Prevent duplicate submissions.

==================================================
20. ERROR STATE
==================================================

Unable to save quiz.

[ Try Again ]

Do not expose technical errors.

==================================================
21. EMPTY QUESTIONS
==================================================

If no questions exist:

No questions yet.

[ Add Question ]

The state should feel like an authoring state.

==================================================
22. QUESTION COUNT
==================================================

If question count is displayed:

Use actual count.

Do not fabricate.

Do not turn it into a KPI card.

==================================================
23. ATTEMPTS
==================================================

Do not display student Attempts inside the Quiz Editor.

Attempts are a separate operational concern.

Do not mix:

Quiz Configuration

with:

Student Performance

==================================================
24. RESPONSIVE
==================================================

Desktop:

Quiz configuration + question builder.

Tablet:

Stack sections.

Mobile:

Single-column editing.

Question options remain readable.

Save action may become a sticky bottom action bar.

==================================================
25. RTL
==================================================

Support Arabic RTL.

Answer ordering must remain clear.

Directional icons mirror correctly.

Text areas support Arabic.

==================================================
26. VISUAL SYSTEM
==================================================

Use the established SYNAPSE MED Design System.

Do not introduce a separate quiz-specific visual identity.

Avoid excessive cards.

Avoid excessive color.

Correct answers should use semantic treatment, not decorative highlighting.

==================================================
27. DATA INTEGRITY
==================================================

Never invent:

- Question types
- Question fields
- Answer counts
- Correct answers
- Passing score
- Max attempts
- Validation rules

Only use the actual Quiz model.

==================================================
28. OUTPUT
==================================================

Create one high-fidelity desktop Quiz Editor.

Show:

- Quiz Configuration
- Passing Score
- Max Attempts
- Questions
- Question Type
- Answer Options
- Correct Answer state
- Add Question
- Save/Cancel
- Validation
- Unsaved changes

Do not create Attempts Analytics in this prompt.

==================================================
29. FINAL QUALITY BAR
==================================================

The result should feel like:

A professional medical education assessment authoring tool.

It must be:

structured

accurate

easy to scan

easy to edit

scalable

calm

consistent with SYNAPSE MED.

Do not make it resemble a consumer quiz builder.