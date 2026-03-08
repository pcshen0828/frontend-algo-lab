import { getAllTopics } from "@/lib/topics";
import AlgorithmCard from "@/components/AlgorithmCard";

export default function AlgorithmsPage() {
  const topics = getAllTopics();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Algorithm Curriculum</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          {topics.length} core algorithms, ordered from foundational to advanced. Each topic
          includes frontend scenarios, visualizations, practice problems, and an AI tutor.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {topics.map((topic, i) => (
          <div key={topic.slug} className="flex gap-3 items-start">
            <span className="mt-5 text-sm font-mono text-gray-400 w-5 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <AlgorithmCard topic={topic} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
