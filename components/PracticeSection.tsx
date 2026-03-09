"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { PracticeItem } from "@/lib/types";
import CodeBlock from "./CodeBlock";

function PracticeCard({
  item,
  index,
  total,
}: {
  item: PracticeItem;
  index: number;
  total: number;
}) {
  const t = useTranslations("practice");
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const reveal = (key: string) => setRevealed((prev) => new Set([...prev, key]));
  const hide = (key: string) =>
    setRevealed((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });

  const hint1Shown = revealed.has("hint1");
  const hint2Shown = revealed.has("hint2");
  const solutionShown = revealed.has("solution");
  const hint2Unlocked = hint1Shown;
  const solutionUnlocked = hint2Shown;

  return (
    <div className="border border-gray-200 rounded-lg p-5 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-gray-500 font-medium">
          {t("problem", { index: index + 1, total })}
        </span>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            item.type === "engineering"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {item.type}
        </span>
      </div>

      <h4 className="font-semibold text-gray-900 text-base">{item.title}</h4>
      <p className="text-gray-700 leading-relaxed">{item.question}</p>

      <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2">
        {t("tryFirst")}
      </p>

      <div className="flex flex-wrap gap-2">
        {/* Hint 1 — always unlocked */}
        {hint1Shown ? (
          <button
            onClick={() => hide("hint1")}
            className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            {t("hideHint1")}
          </button>
        ) : (
          <button
            onClick={() => reveal("hint1")}
            className="text-sm px-3 py-1 rounded border border-blue-300 text-blue-700 hover:bg-blue-50 cursor-pointer transition-colors"
          >
            {t("showHint1")}
          </button>
        )}

        {/* Hint 2 — unlocked after hint1 */}
        {hint2Unlocked ? (
          hint2Shown ? (
            <button
              onClick={() => hide("hint2")}
              className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              {t("hideHint2")}
            </button>
          ) : (
            <button
              onClick={() => reveal("hint2")}
              className="text-sm px-3 py-1 rounded border border-blue-300 text-blue-700 hover:bg-blue-50 cursor-pointer transition-colors"
            >
              {t("showHint2")}
            </button>
          )
        ) : (
          <button
            disabled
            className="text-sm px-3 py-1 rounded border border-gray-200 text-gray-400 cursor-not-allowed"
          >
            {t("hint2Locked")}
          </button>
        )}

        {/* Solution — unlocked after hint2 */}
        {solutionUnlocked ? (
          solutionShown ? (
            <button
              onClick={() => hide("solution")}
              className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              {t("hideSolution")}
            </button>
          ) : (
            <button
              onClick={() => reveal("solution")}
              className="text-sm px-3 py-1 rounded border border-green-300 text-green-700 hover:bg-green-50 cursor-pointer transition-colors"
            >
              {t("showSolution")}
            </button>
          )
        ) : (
          <button
            disabled
            className="text-sm px-3 py-1 rounded border border-gray-200 text-gray-400 cursor-not-allowed"
          >
            {t("solutionLocked")}
          </button>
        )}
      </div>

      {hint1Shown && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
          <span className="font-medium">{t("hint1Label")}:</span> {item.hint1}
        </div>
      )}
      {hint2Shown && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
          <span className="font-medium">{t("hint2Label")}:</span> {item.hint2}
        </div>
      )}
      {solutionShown && (
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {t("solutionLabel")}
          </p>
          <CodeBlock code={item.solution} language="typescript" />
        </div>
      )}
    </div>
  );
}

export default function PracticeSection({ items }: { items: PracticeItem[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <PracticeCard key={item.id} item={item} index={i} total={items.length} />
      ))}
    </div>
  );
}
