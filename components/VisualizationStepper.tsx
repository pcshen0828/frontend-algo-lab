"use client";

import { useState } from "react";
import type { VisualizationStep } from "@/lib/types";

export default function VisualizationStepper({
  steps,
}: {
  steps: VisualizationStep[];
}) {
  const [current, setCurrent] = useState(0);

  if (!steps || steps.length === 0) return null;

  const step = steps[current];

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          Step {current + 1} of {steps.length}: {step.label}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Prev
          </button>
          <button
            onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
            disabled={current === steps.length - 1}
            className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <p className="text-gray-700 leading-relaxed">{step.explanation}</p>
        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm space-y-1 overflow-x-auto">
          {Object.entries(step.state).map(([key, value]) => (
            <div key={key} className="flex gap-3">
              <span className="text-blue-400 shrink-0">{key}:</span>
              <span className="text-gray-100">
                {typeof value === "object"
                  ? JSON.stringify(value)
                  : String(value)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-1 justify-center">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === current ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
