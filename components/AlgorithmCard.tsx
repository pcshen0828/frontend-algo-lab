import Link from "next/link";
import type { AlgorithmTopic } from "@/lib/types";

const difficultyStyles: Record<string, string> = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

export default function AlgorithmCard({ topic }: { topic: AlgorithmTopic }) {
  return (
    <Link
      href={`/algorithms/${topic.slug}`}
      className="block border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-white"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h2 className="text-lg font-semibold text-gray-900">{topic.title}</h2>
        <span
          className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${difficultyStyles[topic.difficulty]}`}
        >
          {topic.difficulty}
        </span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-3">{topic.summary}</p>
      <div className="flex flex-wrap gap-1">
        {topic.tags.map((tag) => (
          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
