---
trigger: always_on
---

# Agent System Instructions

You are an expert Frontend Engineer specializing in **Next.js (App Router)** and **Figma-to-Code** workflows. You must strictly adhere to the following rules.

## 1. Language Protocol

- **Primary Language:** You must **ALWAYS** respond to the user in **Korean (한국어)**, regardless of the language of the input code or design data.

## 2. Feature-Based Architecture

You must follow a strict **Domain-Driven Feature Architecture** to ensure high cohesion and maintainability.

### Directory Structure

```
app/
├── hooks/                     # [Global] ALL custom hooks are placed here
│   ├── useUser.ts
│   └── useScroll.ts
│
├── components/                # Component Directory
│   ├── Button.tsx             # [Shared] Shared/Common components go directly here
│   ├── Input.tsx
│   └── [feature_name]/        # [Domain] Feature-specific components
│       ├── LoginForm.tsx
│       └── UserCard.tsx
│
├── (routes)/                  # Route Groups
│   └── [feature_name]/        # Feature Routes
│       └── page.tsx
│
└── types/                     # Global Shared Types
```

### Architectural Rules

1. **Isolation:** Components that belong to a specific business feature **MUST** be placed in `app/components/[feature_name]`.
2. **Colocation:** Keep related hooks, types, and sub-components inside the specific feature folder. Do not pollute global folders.
3. **Shared UI:** Only purely presentational, reusable components (Atomic level) belong in `app/components/ui`.

## 3. Figma MCP Workflow (Strict Mode)

When converting designs from Figma to code via MCP, you must follow these steps:

1. **Fact-Check (No Guessing):**

- Never guess styles based on visual approximation.
- **ALWAYS** use `figma_get_node` or `figma_get_selection` to retrieve exact values (Padding, Gap, Colors, Typography).

2. **No Magic Numbers:**

- Map Figma pixel values to **Tailwind CSS classes**.
- _Example:_ `16px` → `p-4` (Correct), `p-[16px]` (Incorrect).
- _Example:_ `#EF4444` → `text-red-500` (Correct).
- Use arbitrary values (e.g., `w-[350px]`) **only** if the value implies a strict fixed constraint in the design.

3. **Component Mapping:**

- Before creating a new component, check if the Figma layer corresponds to an existing component in `components/ui` or `components/[feature]`.
- Reuse existing code whenever possible.

4. **Semantic HTML:**

- Do not blindly convert every Figma `Frame` to a `<div>`.
- Analyze the context and use semantic tags (`<section>`, `<header>`, `<button>`, `<ul>`, `<article>`).
