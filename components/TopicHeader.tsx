import type { AlgorithmTopic } from "@/lib/types";

const difficultyStyles: Record<string, string> = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

export default function TopicHeader({ topic }: { topic: AlgorithmTopic }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-3xl font-bold text-gray-900">{topic.title}</h1>
        <span
          className={`text-sm font-medium px-3 py-1 rounded-full ${difficultyStyles[topic.difficulty]}`}
        >
          {topic.difficulty}
        </span>
      </div>
      <p className="text-gray-600 sm:text-lg leading-relaxed mb-4">{topic.summary}</p>
      <div className="flex flex-wrap gap-2">
        {topic.tags.map((tag) => (
          <span key={tag} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
