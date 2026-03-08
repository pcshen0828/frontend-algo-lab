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

export function getAllTopics(): AlgorithmTopic[] {
  const topics = loadAllTopics();
  return sortTopicsByCurriculum(topics);
}

export function getTopicBySlug(slug: string): AlgorithmTopic | null {
  try {
    return loadTopicBySlug(slug);
  } catch {
    return null;
  }
}

export function getPreviousTopic(slug: string): AlgorithmTopic | null {
  const idx = CURRICULUM_ORDER.indexOf(slug);
  if (idx <= 0) return null;
  return getTopicBySlug(CURRICULUM_ORDER[idx - 1]);
}

export function getNextTopic(slug: string): AlgorithmTopic | null {
  const idx = CURRICULUM_ORDER.indexOf(slug);
  if (idx === -1 || idx >= CURRICULUM_ORDER.length - 1) return null;
  return getTopicBySlug(CURRICULUM_ORDER[idx + 1]);
}
