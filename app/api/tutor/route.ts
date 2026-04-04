import { NextRequest } from "next/server";
import Anthropic, { APIError } from "@anthropic-ai/sdk";
import { loadTopicBySlug } from "@/lib/topic-loader";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

type Message = { role: "user" | "assistant"; content: string };

function buildSystemPrompt(topicSlug: string): string {
  let topic;
  try {
    topic = loadTopicBySlug(topicSlug, "en");
  } catch {
    // unknown slug
  }
  if (!topic) {
    return "You are an AI tutor for frontend engineers learning algorithms. Keep replies concise and ground explanations in practical frontend scenarios. Be Socratic — guide with questions rather than immediately giving full answers.";
  }

  return `You are an AI tutor for frontend engineers learning algorithms.
The student is currently studying: ${topic.title}

Overview: ${topic.overview}
Core concept: ${topic.coreConcept}
Problem patterns: ${topic.problemPatterns.join(" | ")}

Keep replies concise (2-4 short paragraphs). Ground explanations in frontend scenarios.
Be Socratic — guide with questions rather than immediately giving full answers.`;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { topicSlug, userMessage, messages } = body as {
    topicSlug: string;
    userMessage: string;
    messages?: Message[];
  };

  if (!userMessage?.trim()) {
    return new Response("userMessage is required", { status: 400 });
  }

  const history: Message[] = (messages ?? []).slice(-10);
  const lastMessage = history[history.length - 1];
  if (!lastMessage || lastMessage.role !== "user" || lastMessage.content !== userMessage) {
    history.push({ role: "user", content: userMessage });
  }

  try {
    const anthropicStream = client.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      system: buildSystemPrompt(topicSlug ?? ""),
      messages: history,
    });

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of anthropicStream) {
            if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
              controller.enqueue(new TextEncoder().encode(chunk.delta.text));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    if (err instanceof APIError) {
      console.error("[tutor] Anthropic API error:", err.status, err.message);
      return new Response(err.message, { status: 502 });
    }
    return new Response("Internal server error", { status: 500 });
  }
}
