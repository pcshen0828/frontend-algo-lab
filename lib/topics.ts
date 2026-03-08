import { loadAllTopics, loadTopicBySlug } from "./topic-loader";
import type { AlgorithmTopic } from "./types";

export const CURRICULUM_ORDER: string[] = [
  "binary-search",
  "hash-map-set",
  "tree-traversal",
  "stack-queue",
  "sliding-window",
  "sorting",
  "two-pointers",
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
