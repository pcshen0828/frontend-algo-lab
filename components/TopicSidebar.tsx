"use client";

import { useEffect, useState } from "react";

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
];

export default function TopicSidebar() {
  const [activeId, setActiveId] = useState("overview");

  // Scroll to top on mount (new topic page)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }
        // Pick the first section in SECTIONS order that is visible
        const active = SECTIONS.find((s) => visible.has(s.id));
        if (active) setActiveId(active.id);
      },
      { rootMargin: "-80px 0px -40% 0px" }
    );

    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <nav className="sticky top-20 w-52 shrink-0">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        On this page
      </p>
      <ul className="space-y-1">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => scrollToSection(s.id)}
              className={`w-full text-left text-sm py-1 px-2 rounded cursor-pointer transition-colors ${
                activeId === s.id
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
