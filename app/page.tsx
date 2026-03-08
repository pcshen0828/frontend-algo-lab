import Link from "next/link";
import { getTopicBySlug, CURRICULUM_ORDER } from "@/lib/topics";

export default function Home() {
  const firstTopic = getTopicBySlug(CURRICULUM_ORDER[0]);
  const firstTopicTitle = firstTopic?.title ?? CURRICULUM_ORDER[0];
  const firstTopicSlug = firstTopic?.slug ?? CURRICULUM_ORDER[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Hero */}
      <section className="text-center mb-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">Frontend Algo Lab</h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
          Algorithm concepts explained through the lens of frontend engineering. Stop memorizing
          solutions. Start recognizing patterns.
        </p>
        <Link
          href="/algorithms"
          className="inline-block bg-blue-600 text-white text-lg font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Algorithms →
        </Link>
      </section>

      {/* Philosophy */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold text-gray-900 mb-2">Static Curriculum</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              10 core algorithms with deep dives into problem patterns, implementation, and
              step-by-step visualization. Learn at your own pace.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Frontend Scenarios</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Every algorithm is grounded in real frontend use cases — virtual lists, state
              normalization, event pipelines, and more.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Tutor</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Each topic has a built-in AI tutor. Ask questions, get explanations tailored to your
              level, and explore edge cases interactively.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-white border border-gray-200 rounded-lg p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to start?</h2>
        <p className="text-gray-600 mb-6">
          Begin with {firstTopicTitle} or jump to any topic in the curriculum.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href={`/algorithms/${firstTopicSlug}`}
            className="bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start with {firstTopicTitle}
          </Link>
          <Link
            href="/algorithms"
            className="border border-gray-300 text-gray-700 font-medium px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View All Topics
          </Link>
        </div>
      </section>
    </div>
  );
}
