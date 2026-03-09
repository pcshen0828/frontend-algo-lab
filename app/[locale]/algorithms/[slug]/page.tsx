import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getTopicBySlug, CURRICULUM_ORDER } from "@/lib/topics";
import { routing } from "@/i18n/routing";
import TopicHeader from "@/components/TopicHeader";
import SectionList from "@/components/SectionList";
import CodeBlock from "@/components/CodeBlock";
import VisualizationStepper from "@/components/VisualizationStepper";
import PracticeSection from "@/components/PracticeSection";
import TutorChat from "@/components/TutorChat";
import TopicSidebar, { PAGE_BOTTOM_ID } from "@/components/TopicSidebar";
import TopicNavigation from "@/components/TopicNavigation";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CURRICULUM_ORDER.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const topic = getTopicBySlug(slug, locale);
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

export default async function TopicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const topic = getTopicBySlug(slug, locale);

  if (!topic) notFound();

  const t = await getTranslations({ locale, namespace: "topic" });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 pb-24">
      <div className="flex gap-10 items-start">
        {/* Sidebar */}
        <TopicSidebar />

        {/* Main content */}
        <article className="flex-1 min-w-0 space-y-12">
          <TopicHeader topic={topic} />

          <section id="overview">
            <SectionHeading id="overview">{t("overview")}</SectionHeading>
            <p className="text-base leading-8 text-gray-700">{topic.overview}</p>
          </section>

          <section id="core-concept">
            <SectionHeading id="core-concept">{t("coreConcept")}</SectionHeading>
            <p className="text-base leading-8 text-gray-700">{topic.coreConcept}</p>
          </section>

          <section id="problem-patterns">
            <SectionList heading={t("problemPatterns")} items={topic.problemPatterns} />
          </section>

          <section id="signals">
            <SectionList heading={t("signals")} items={topic.signals} />
          </section>

          <section id="frontend-scenarios">
            <SectionHeading id="frontend-scenarios">{t("frontendScenarios")}</SectionHeading>
            <div className="space-y-6">
              {topic.frontendScenarios.map((s, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-7 mb-3">{s.description}</p>
                  <CodeBlock code={s.example} language="typescript" />
                </div>
              ))}
            </div>
          </section>

          <section id="data-thinking">
            <SectionHeading id="data-thinking">{t("dataThinking")}</SectionHeading>
            <p className="text-base leading-8 text-gray-700">{topic.dataThinking}</p>
          </section>

          <section id="naive-approach">
            <SectionHeading id="naive-approach">{t("naiveApproach")}</SectionHeading>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-1">
              <p className="text-base text-gray-700 leading-relaxed">
                {topic.naiveApproach.description}
              </p>
              <p className="text-sm text-red-700 font-mono">{topic.naiveApproach.complexity}</p>
            </div>
          </section>

          <section id="better-approach">
            <SectionHeading id="better-approach">{t("betterApproach")}</SectionHeading>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-1">
              <p className="text-base text-gray-700 leading-relaxed">
                {topic.betterApproach.description}
              </p>
              <p className="text-sm text-green-700 font-mono">{topic.betterApproach.complexity}</p>
            </div>
          </section>

          <section id="implementation">
            <SectionHeading id="implementation">{t("implementation")}</SectionHeading>
            <CodeBlock code={topic.implementation.code} language={topic.implementation.language} />
          </section>

          <section id="visualization">
            <SectionHeading id="visualization">{t("visualization")}</SectionHeading>
            <VisualizationStepper steps={topic.visualizationSteps} />
          </section>

          <section id="practice">
            <SectionHeading id="practice">{t("practice")}</SectionHeading>
            <PracticeSection items={topic.practiceItems} />
          </section>

          <section id="reflection">
            <SectionList heading={t("reflection")} items={topic.reflectionPrompts} />
          </section>

          <TopicNavigation currentSlug={topic.slug} locale={locale} />

          <div id={PAGE_BOTTOM_ID} />
        </article>
      </div>
      <TutorChat topicSlug={topic.slug} topicTitle={topic.title} />
    </div>
  );
}
