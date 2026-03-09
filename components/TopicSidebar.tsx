"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export const PAGE_BOTTOM_ID = "page-bottom";

export default function TopicSidebar() {
  const t = useTranslations("sidebar");

  const SECTIONS = [
    { id: "overview", label: t("overview") },
    { id: "core-concept", label: t("coreConcept") },
    { id: "problem-patterns", label: t("problemPatterns") },
    { id: "signals", label: t("signals") },
    { id: "frontend-scenarios", label: t("frontendScenarios") },
    { id: "data-thinking", label: t("dataThinking") },
    { id: "naive-approach", label: t("naiveApproach") },
    { id: "better-approach", label: t("betterApproach") },
    { id: "implementation", label: t("implementation") },
    { id: "visualization", label: t("visualization") },
    { id: "practice", label: t("practice") },
    { id: "reflection", label: t("reflection") },
  ];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Activate the last section when the user reaches the bottom of the page
  useEffect(() => {
    const sentinel = document.getElementById(PAGE_BOTTOM_ID);
    if (!sentinel) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActiveId(SECTIONS[SECTIONS.length - 1].id);
    });
    obs.observe(sentinel);

    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <nav className="hidden lg:block sticky top-20 w-52 shrink-0">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        {t("onThisPage")}
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
