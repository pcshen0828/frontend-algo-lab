import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getTopicBySlug, CURRICULUM_ORDER } from "@/lib/topics";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const firstTopic = getTopicBySlug(CURRICULUM_ORDER[0], locale);
  const firstTopicTitle = firstTopic?.title ?? CURRICULUM_ORDER[0];
  const firstTopicSlug = firstTopic?.slug ?? CURRICULUM_ORDER[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Hero */}
      <section className="text-center mb-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">{t("heroTitle")}</h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
          {t("heroSubtitle")}
        </p>
        <Link
          href="/algorithms"
          className="inline-block bg-blue-600 text-white text-lg font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t("browseAlgorithms")}
        </Link>
      </section>

      {/* Philosophy */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          {t("howItWorksTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold text-gray-900 mb-2">{t("card1Title")}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{t("card1Desc")}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">{t("card2Title")}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{t("card2Desc")}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="font-semibold text-gray-900 mb-2">{t("card3Title")}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{t("card3Desc")}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-white border border-gray-200 rounded-lg p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{t("ctaTitle")}</h2>
        <p className="text-gray-600 mb-6">{t("ctaSubtitle", { firstTopicTitle })}</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href={`/algorithms/${firstTopicSlug}`}
            className="bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("startWith", { firstTopicTitle })}
          </Link>
          <Link
            href="/algorithms"
            className="border border-gray-300 text-gray-700 font-medium px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t("viewAllTopics")}
          </Link>
        </div>
      </section>
    </div>
  );
}
