export type Difficulty = "easy" | "medium" | "hard";

export interface PracticeItem {
  id: string;
  title: string;
  question: string;
  hint1: string;
  hint2: string;
  solution: string;
  type: "pattern" | "engineering";
}

export interface VisualizationStep {
  label: string;
  state: Record<string, unknown>;
  explanation: string;
}

export interface AlgorithmTopic {
  slug: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  summary: string;
  overview: string;
  coreConcept: string;
  problemPatterns: string[];
  signals: string[];
  frontendScenarios: {
    title: string;
    description: string;
    example: string;
  }[];
  dataThinking: string;
  naiveApproach: {
    description: string;
    complexity: string;
  };
  betterApproach: {
    description: string;
    complexity: string;
  };
  implementation: {
    language: string;
    code: string;
  };
  visualizationSteps: VisualizationStep[];
  practiceItems: PracticeItem[];
  reflectionPrompts: string[];
}
