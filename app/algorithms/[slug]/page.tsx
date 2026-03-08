import { notFound } from "next/navigation";
import { getTopicBySlug, CURRICULUM_ORDER } from "@/lib/topics";
import TopicHeader from "@/components/TopicHeader";
import SectionList from "@/components/SectionList";
import CodeBlock from "@/components/CodeBlock";
import VisualizationStepper from "@/components/VisualizationStepper";
import PracticeSection from "@/components/PracticeSection";
import TutorChat from "@/components/TutorChat";
import TopicSidebar from "@/components/TopicSidebar";

export function generateStaticParams() {
  return CURRICULUM_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return {};
  return {
    title: `${topic.title} — Frontend Algo Lab`,
    description: topic.summary,
  };
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4 mt-2 scroll-mt-20"
    >
      {children}
    </h2>
  );
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex gap-10">
        {/* Sidebar */}
        <TopicSidebar />

        {/* Main content */}
        <article className="flex-1 min-w-0 space-y-12">
          <TopicHeader topic={topic} />

          {/* Overview */}
          <section id="overview">
            <SectionHeading id="overview">Overview</SectionHeading>
            <p className="text-base leading-8 text-gray-700">{topic.overview}</p>
          </section>

          {/* Core Concept */}
          <section id="core-concept">
            <SectionHeading id="core-concept">Core Concept</SectionHeading>
            <p className="text-base leading-8 text-gray-700">{topic.coreConcept}</p>
          </section>

          {/* Problem Patterns */}
          <section id="problem-patterns">
            <SectionList heading="Problem Patterns" items={topic.problemPatterns} />
          </section>

          {/* Signals */}
          <section id="signals">
            <SectionList heading="When to Use This Pattern" items={topic.signals} />
          </section>

          {/* Frontend Scenarios */}
          <section id="frontend-scenarios">
            <SectionHeading id="frontend-scenarios">Frontend Scenarios</SectionHeading>
            <div className="space-y-6">
              {topic.frontendScenarios.map((s, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-7 mb-3">
                    {s.description}
                  </p>
                  <CodeBlock code={s.example} language="typescript" />
                </div>
              ))}
            </div>
          </section>

          {/* Data Thinking */}
          <section id="data-thinking">
            <SectionHeading id="data-thinking">Data Thinking</SectionHeading>
            <p className="text-base leading-8 text-gray-700">{topic.dataThinking}</p>
          </section>

          {/* Approaches */}
          <section id="naive-approach">
            <SectionHeading id="naive-approach">Naive Approach</SectionHeading>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-1">
              <p className="text-base text-gray-700 leading-relaxed">{topic.naiveApproach.description}</p>
              <p className="text-sm text-red-700 font-mono">{topic.naiveApproach.complexity}</p>
            </div>
          </section>

          <section id="better-approach">
            <SectionHeading id="better-approach">Better Approach</SectionHeading>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-1">
              <p className="text-base text-gray-700 leading-relaxed">{topic.betterApproach.description}</p>
              <p className="text-sm text-green-700 font-mono">{topic.betterApproach.complexity}</p>
            </div>
          </section>

          {/* Implementation */}
          <section id="implementation">
            <SectionHeading id="implementation">Implementation</SectionHeading>
            <CodeBlock
              code={topic.implementation.code}
              language={topic.implementation.language}
            />
          </section>

          {/* Visualization */}
          <section id="visualization">
            <SectionHeading id="visualization">Step-by-Step Visualization</SectionHeading>
            <VisualizationStepper steps={topic.visualizationSteps} />
          </section>

          {/* Practice */}
          <section id="practice">
            <SectionHeading id="practice">Practice Problems</SectionHeading>
            <PracticeSection items={topic.practiceItems} />
          </section>

          {/* Reflection */}
          <section id="reflection">
            <SectionList
              heading="Reflection Prompts"
              items={topic.reflectionPrompts}
            />
          </section>

          {/* AI Tutor */}
          <section id="ai-tutor">
            <SectionHeading id="ai-tutor">Ask the AI Tutor</SectionHeading>
            <TutorChat topicSlug={topic.slug} topicTitle={topic.title} />
          </section>
        </article>
      </div>
    </div>
  );
}
