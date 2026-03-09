import fs from "fs";
import path from "path";
import type { AlgorithmTopic } from "./types";

const BASE_DATA_DIR = path.join(process.cwd(), "data", "algorithms");

function resolveTopicPath(slug: string, locale: string): string {
  const localePath = path.join(BASE_DATA_DIR, locale, `${slug}.json`);
  if (fs.existsSync(localePath)) return localePath;
  return path.join(BASE_DATA_DIR, "en", `${slug}.json`);
}

export function loadTopicBySlug(slug: string, locale = "en"): AlgorithmTopic {
  const filePath = resolveTopicPath(slug, locale);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Topic not found: ${slug} (locale: ${locale})`);
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as AlgorithmTopic;
}

export function loadAllTopics(locale = "en"): AlgorithmTopic[] {
  const enDir = path.join(BASE_DATA_DIR, "en");
  if (!fs.existsSync(enDir)) {
    throw new Error(`Data directory not found: ${enDir}`);
  }
  const files = fs.readdirSync(enDir).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const slug = file.replace(".json", "");
    return loadTopicBySlug(slug, locale);
  });
}
