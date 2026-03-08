"use client";

import { useState } from "react";
import type { PracticeItem } from "@/lib/types";
import CodeBlock from "./CodeBlock";

function PracticeCard({ item }: { item: PracticeItem }) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const toggle = (key: string) =>
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  return (
    <div className="border border-gray-200 rounded-lg p-5 space-y-4">
      <div className="flex items-start gap-2">
        <span
          className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full mt-0.5 ${
            item.type === "engineering"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {item.type}
        </span>
        <h4 className="font-semibold text-gray-900">{item.title}</h4>
      </div>
      <p className="text-gray-700 leading-relaxed">{item.question}</p>
      <div className="flex flex-wrap gap-2">
        {(["hint1", "hint2", "solution"] as const).map((key) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            {revealed.has(key) ? "Hide" : "Show"}{" "}
            {key === "hint1" ? "Hint 1" : key === "hint2" ? "Hint 2" : "Solution"}
          </button>
        ))}
      </div>
      {revealed.has("hint1") && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
          <span className="font-medium">Hint 1:</span> {item.hint1}
        </div>
      )}
      {revealed.has("hint2") && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
          <span className="font-medium">Hint 2:</span> {item.hint2}
        </div>
      )}
      {revealed.has("solution") && (
        <CodeBlock code={item.solution} language="typescript" />
      )}
    </div>
  );
}

export default function PracticeSection({ items }: { items: PracticeItem[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <PracticeCard key={item.id} item={item} />
      ))}
    </div>
  );
}
