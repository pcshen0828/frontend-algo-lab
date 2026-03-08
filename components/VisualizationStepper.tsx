"use client";

import { useState, useEffect, useCallback } from "react";
import type { VisualizationStep } from "@/lib/types";

function StateValue({
  stateKey,
  value,
  state,
}: {
  stateKey: string;
  value: unknown;
  state: Record<string, unknown>;
}) {
  if (Array.isArray(value)) {
    const highlightIdx =
      typeof state.mid === "number"
        ? state.mid
        : typeof state.current === "number"
          ? state.current
          : -1;
    return (
      <div className="flex flex-wrap gap-1 items-center">
        <span className="text-gray-500 font-mono text-sm">[</span>
        {value.map((item, i) => (
          <span
            key={i}
            className={`inline-flex flex-col items-center px-1.5 py-0.5 rounded text-xs font-mono leading-tight ${
              i === highlightIdx
                ? "bg-yellow-300 text-yellow-900 font-bold ring-1 ring-yellow-500"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            <span className="text-[9px] text-gray-400 leading-none">{i}</span>
            <span>{String(item)}</span>
          </span>
        ))}
        <span className="text-gray-500 font-mono text-sm">]</span>
      </div>
    );
  }
  if (value === null || value === false) {
    return <span className="text-gray-500 italic text-sm">—</span>;
  }
  if (value === true) {
    return <span className="text-green-400 font-medium text-sm">✓ true</span>;
  }
  if (typeof value === "object") {
    return (
      <span className="text-gray-300 font-mono text-xs">
        {JSON.stringify(value)}
      </span>
    );
  }
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-mono font-medium ${
        typeof value === "number"
          ? "bg-blue-900 text-blue-200"
          : "bg-gray-700 text-gray-200"
      }`}
    >
      {String(value)}
    </span>
  );
}

export default function VisualizationStepper({
  steps,
}: {
  steps: VisualizationStep[];
}) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const next = useCallback(
    () => setCurrent((c) => Math.min(steps.length - 1, c + 1)),
    [steps.length]
  );

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  if (!steps || steps.length === 0) return null;

  const step = steps[current];
  const progress = ((current + 1) / steps.length) * 100;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step header */}
      <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Step {current + 1} of {steps.length}
        </span>
        <span className="text-sm font-semibold text-gray-800">{step.label}</span>
      </div>

      {/* Explanation — primary element */}
      <div className="bg-white px-5 py-4 border-b border-gray-100">
        <p className="text-base leading-7 text-gray-800">{step.explanation}</p>
      </div>

      {/* State panel */}
      <div className="bg-gray-900 px-4 py-3 space-y-2.5">
        {Object.entries(step.state).map(([key, value]) => (
          <div key={key} className="flex items-start gap-3">
            <span className="text-blue-400 text-sm font-mono shrink-0 w-24 pt-0.5">
              {key}
            </span>
            <div className="flex-1 min-w-0">
              <StateValue
                stateKey={key}
                value={value}
                state={step.state as Record<string, unknown>}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Step strip + controls */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              title={s.label}
              className={`shrink-0 w-7 h-7 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                i < current
                  ? "bg-blue-100 text-blue-700"
                  : i === current
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-400 hover:bg-gray-300"
              }`}
            >
              {i < current ? "✓" : i + 1}
            </button>
          ))}
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={prev}
            disabled={current === 0}
            className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            ← Prev
          </button>
          <button
            onClick={next}
            disabled={current === steps.length - 1}
            className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
