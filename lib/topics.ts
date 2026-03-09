import { loadAllTopics, loadTopicBySlug } from "./topic-loader";
import type { AlgorithmTopic } from "./types";

export const CURRICULUM_ORDER: string[] = [
  "hash-map-set",
  "tree-traversal",
  "binary-search",
  "stack-queue",
  "sorting",
  "two-pointers",
  "sliding-window",
  "recursion",
  "bfs-dfs",
  "dynamic-programming",
];

export function sortTopicsByCurriculum(topics: AlgorithmTopic[]): AlgorithmTopic[] {
  return [...topics].sort((a, b) => {
    const ai = CURRICULUM_ORDER.indexOf(a.slug);
    const bi = CURRICULUM_ORDER.indexOf(b.slug);
    const aOrder = ai === -1 ? 999 : ai;
    const bOrder = bi === -1 ? 999 : bi;
    return aOrder - bOrder;
  });
}

export function getAllTopics(locale = "en"): AlgorithmTopic[] {
  const topics = loadAllTopics(locale);
  return sortTopicsByCurriculum(topics);
}

export function getTopicBySlug(slug: string, locale = "en"): AlgorithmTopic | null {
  try {
    return loadTopicBySlug(slug, locale);
  } catch {
    return null;
  }
}

export function getPreviousTopic(slug: string, locale = "en"): AlgorithmTopic | null {
  const idx = CURRICULUM_ORDER.indexOf(slug);
  if (idx <= 0) return null;
  return getTopicBySlug(CURRICULUM_ORDER[idx - 1], locale);
}

export function getNextTopic(slug: string, locale = "en"): AlgorithmTopic | null {
  const idx = CURRICULUM_ORDER.indexOf(slug);
  if (idx === -1 || idx >= CURRICULUM_ORDER.length - 1) return null;
  return getTopicBySlug(CURRICULUM_ORDER[idx + 1], locale);
}
