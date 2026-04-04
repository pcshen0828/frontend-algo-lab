# Frontend Algo Lab

An algorithm learning assistant designed for frontend engineers.

**Live Demo:**  
https://frontend-algo-lab.vercel.app/

Frontend Algo Lab helps frontend developers build stronger intuition for data structures and algorithms through:

- standard algorithm topics
- JavaScript / TypeScript implementations
- frontend-relevant engineering scenarios
- interactive visualizations
- guided practice
- an AI tutor for explanations and hints

Unlike typical algorithm platforms, this project focuses on **data thinking for frontend engineers**, not competitive programming or interview grinding.

---

# Why This Project Exists

Many frontend engineers encounter algorithmic thinking in subtle ways:

- transforming nested data structures
- optimizing lookups
- traversing trees
- handling ordered datasets
- detecting boundaries
- managing state efficiently

However, most algorithm learning resources:

- use C++ / Java
- focus heavily on interview patterns
- feel disconnected from real frontend work

Frontend Algo Lab attempts to bridge that gap by keeping the **algorithm concepts standard**, while presenting them in a context more familiar to frontend engineers.

---

# Learning Philosophy

This project follows three core principles.

## 1. Standard algorithm topics remain the backbone

Topics are organized using classic algorithm categories:

- Hash Map / Set
- Tree Traversal
- Binary Search
- Stack / Queue
- Sliding Window
- Sorting
- Two Pointers
- Recursion
- BFS / DFS
- Dynamic Programming

This keeps the curriculum aligned with traditional algorithm learning.

---

## 2. Frontend-relevant scenarios provide context

Each topic includes examples such as:

- nested comment trees
- menu structures
- scroll position lookups
- timeline searches
- deduplication and indexing
- grouping and aggregation

These examples connect algorithm thinking to real frontend engineering situations.

---

## 3. Static curriculum + AI tutoring

The system deliberately separates:

### Static content

Defines the learning structure.

Includes:

- topic explanations
- problem patterns
- signals
- frontend scenarios
- implementations
- practice questions
- visualization steps

### AI tutor

Provides interactive learning support:

- explaining concepts
- helping identify patterns
- giving hints without revealing solutions
- discussing trade-offs
- clarifying misunderstandings

This keeps the curriculum **stable and reliable**, while still allowing flexible learning interaction.

---

# Features

## Algorithm Topic Pages

Each topic page includes:

- Overview
- Core Concept
- Problem Patterns
- Signals (When to think about this approach)
- Frontend Engineering Scenarios
- Data Thinking Lens
- Naive vs Better Approach
- JavaScript / TypeScript implementation
- Visualization
- Practice exercises
- Reflection prompts

---

## Interactive Visualization

Some algorithms include visual exploration tools such as:

- Binary search stepper
- traversal demonstrations
- step-by-step state visualization

These help illustrate algorithm behavior more intuitively.

---

## Guided Practice

Practice questions support progressive hints:

- Hint 1
- Hint 2
- Solution

Encouraging exploration instead of immediately revealing answers.

---

## AI Tutor

The AI tutor appears as a **floating assistant** that can:

- answer conceptual questions
- provide hints
- help debug reasoning
- discuss algorithm trade-offs
- summarize understanding

The tutor is aware of the current algorithm topic.

---

# Example Topics

Current topics include:

- Hash Map / Set
- Tree Traversal
- Binary Search
- Stack / Queue
- Sorting
- Two Pointers
- Sliding Window
- Recursion
- BFS / DFS
- Dynamic Programming

Topics are arranged as a progressive learning path.

---

# Tech Stack

Frontend Algo Lab intentionally uses a simple architecture.

**Frontend**

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS v4

**Content**

- Static JSON topic definitions

**AI**

- API route for tutor interaction
- LLM integration ready

This architecture keeps the project lightweight and easy to extend.

---

# Project Structure

```
app/
  page.tsx
  layout.tsx
  algorithms/
    page.tsx
    [slug]/
      page.tsx
  api/
    tutor/
      route.ts

components/
  AlgorithmCard
  CodeBlock
  SectionList
  TopicHeader
  TopicSidebar
  TopicNavigation
  VisualizationStepper
  PracticeSection
  TutorChat

data/
  algorithms/

lib/
  topic-loader
  topics
  types
```

---

# Running Locally

Clone the repository:

```
git clone <repo-url>
cd frontend-algo-lab
```

Install dependencies:

```
npm install
```

Create a `.env.local` file and add your Anthropic API key:

```
ANTHROPIC_API_KEY=your_api_key_here
```

The AI tutor requires this key. Without it, the tutor chat will return an error. You can get an API key at [console.anthropic.com](https://console.anthropic.com).

Run the development server:

```
npm run dev
```

Open:

```
http://localhost:3000
```

---

# Future Ideas

Possible improvements include:

### Learning Experience

- progress tracking
- topic completion state
- algorithm learning map
- spaced repetition for exercises

### AI Tutor

- topic-aware hints
- exercise-specific guidance
- conversation history

### Visualization

- more algorithm visualizers
- tree traversal playground
- sliding window interactive demo

### Developer Improvements

- MDX-based content
- topic authoring tools
- analytics for learning insights

---

# Who This Is For

Frontend Algo Lab is designed for:

- frontend engineers who want stronger algorithm intuition
- developers who prefer JavaScript / TypeScript examples
- engineers interested in **data-oriented thinking**

It is **not primarily designed for competitive programming preparation**.

---

# Inspiration

This project is based on a simple idea:

> Strong engineers think clearly about data structures and problem patterns.

Frontend Algo Lab explores how algorithm learning can feel more natural for frontend developers.

---

# License

MIT
