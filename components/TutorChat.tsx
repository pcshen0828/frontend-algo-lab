"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTER_QUESTIONS: Record<string, string[]> = {
  "binary-search": [
    "What's the difference between exact search and boundary search?",
    "How does this apply to virtual lists?",
    "When does binary search fail?",
  ],
  "hash-map-set": [
    "When should I use Map vs plain object?",
    "How does normalization work in Redux?",
    "What's the space trade-off?",
  ],
  "tree-traversal": [
    "When do I use BFS vs DFS?",
    "How do I avoid stack overflow on deep trees?",
    "How does this relate to React's rendering?",
  ],
  "sliding-window": [
    "When does the window expand vs shrink?",
    "How is this different from two pointers?",
    "What makes a problem a sliding window problem?",
  ],
  "two-pointers": [
    "When do both pointers start at the same end?",
    "How does sorting help with two-pointer problems?",
    "What's the difference between two pointers and sliding window?",
  ],
  sorting: [
    "When would I use merge sort vs quicksort in practice?",
    "How does JavaScript's built-in sort work?",
    "What sorting algorithm is best for nearly-sorted data?",
  ],
  recursion: [
    "How do I convert a recursive solution to iterative?",
    "When should I use memoization with recursion?",
    "How do I identify the base case?",
  ],
  "stack-queue": [
    "When do I use a stack vs a queue?",
    "How does a stack relate to recursion?",
    "What frontend problems are naturally stack-based?",
  ],
  "bfs-dfs": [
    "When is BFS better than DFS?",
    "How do I implement BFS iteratively?",
    "What's the space complexity difference?",
  ],
  "dynamic-programming": [
    "How do I recognize a DP problem?",
    "What's the difference between top-down and bottom-up DP?",
    "How do I find the recurrence relation?",
  ],
};

export default function TutorChat({
  topicSlug,
  topicTitle,
}: {
  topicSlug: string;
  topicTitle: string;
}) {
  const t = useTranslations("tutor");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: t("greeting", { topicTitle }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasUserMessages = messages.some((m) => m.role === "user");
  const starterQuestions = STARTER_QUESTIONS[topicSlug] ?? [];

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  async function send(text: string) {
    if (!text || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicSlug, userMessage: text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("errorMessage"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    send(input.trim());
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full px-4 py-2.5 bg-blue-600 text-white text-sm shadow-lg hover:bg-blue-700 cursor-pointer transition-colors"
        >
          {t("openButton")}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div className="w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] flex flex-col rounded-2xl border border-gray-200 shadow-xl bg-white">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{topicTitle} — AI Tutor</h3>
            <p className="text-xs text-gray-500">{t("subheading")}</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label={t("closeLabel")}
            className="text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer transition-colors"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2.5 text-sm text-gray-500">
                {t("thinking")}
              </div>
            </div>
          )}
        </div>

        {/* Starter question chips */}
        {!hasUserMessages && starterQuestions.length > 0 && (
          <div className="px-4 pb-3 flex flex-wrap gap-2 shrink-0">
            {starterQuestions.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-xs px-3 py-1.5 rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 cursor-pointer transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input form */}
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex gap-2 shrink-0">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("placeholder")}
            disabled={loading}
            className="flex-1 text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            {t("sendButton")}
          </button>
        </form>
      </div>
    </div>
  );
}
