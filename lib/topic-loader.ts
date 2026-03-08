import fs from "fs";
import path from "path";
import type { AlgorithmTopic } from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "algorithms");

export function loadTopicBySlug(slug: string): AlgorithmTopic {
  const filePath = path.join(DATA_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Topic not found: ${slug} (expected at ${filePath})`);
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as AlgorithmTopic;
}

export function loadAllTopics(): AlgorithmTopic[] {
  if (!fs.existsSync(DATA_DIR)) {
    throw new Error(`Data directory not found: ${DATA_DIR}`);
  }
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");
    return JSON.parse(raw) as AlgorithmTopic;
  });
}
