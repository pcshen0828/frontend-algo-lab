import Link from "next/link";
import { getPreviousTopic, getNextTopic } from "@/lib/topics";

export default function TopicNavigation({ currentSlug }: { currentSlug: string }) {
  const prev = getPreviousTopic(currentSlug);
  const next = getNextTopic(currentSlug);

  if (!prev && !next) return null;

  return (
    <nav aria-label="Topic navigation" className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex justify-between items-center">
        {prev ? (
          <Link
            href={`/algorithms/${prev.slug}`}
            aria-label={`Go to previous topic: ${prev.title}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            <span aria-hidden="true">←</span>
            <span>{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {next && (
          <Link
            href={`/algorithms/${next.slug}`}
            aria-label={`Go to next topic: ${next.title}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-colors"
          >
            <span>{next.title}</span>
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
