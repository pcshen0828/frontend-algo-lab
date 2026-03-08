"use client";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "core-concept", label: "Core Concept" },
  { id: "problem-patterns", label: "Problem Patterns" },
  { id: "signals", label: "When to Use" },
  { id: "frontend-scenarios", label: "Frontend Scenarios" },
  { id: "data-thinking", label: "Data Thinking" },
  { id: "naive-approach", label: "Naive Approach" },
  { id: "better-approach", label: "Better Approach" },
  { id: "implementation", label: "Implementation" },
  { id: "visualization", label: "Visualization" },
  { id: "practice", label: "Practice" },
  { id: "reflection", label: "Reflection" },
  { id: "ai-tutor", label: "AI Tutor" },
];

export default function TopicSidebar() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav className="sticky top-8 w-52 shrink-0">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        On this page
      </p>
      <ul className="space-y-1">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => scrollTo(s.id)}
              className="w-full text-left text-sm text-gray-600 hover:text-blue-600 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
            >
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
