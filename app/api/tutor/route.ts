import { NextRequest, NextResponse } from "next/server";
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
  try {
    const body = await request.json();
    const { topicSlug, userMessage, messages } = body as {
      topicSlug: string;
      userMessage: string;
      messages?: Message[];
    };

    if (!userMessage?.trim()) {
      return NextResponse.json({ error: "userMessage is required" }, { status: 400 });
    }

    // Build history: use last 10 messages (5 turns) to cap token usage
    const history: Message[] = (messages ?? []).slice(-10);

    // Append the new user message if not already the last one
    const lastMessage = history[history.length - 1];
    if (!lastMessage || lastMessage.role !== "user" || lastMessage.content !== userMessage) {
      history.push({ role: "user", content: userMessage });
    }

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      system: buildSystemPrompt(topicSlug ?? ""),
      messages: history,
    });

    const reply =
      response.content[0]?.type === "text"
        ? response.content[0].text
        : "Sorry, I had trouble responding. Please try again.";

    return NextResponse.json({ reply });
  } catch (err) {
    if (err instanceof APIError) {
      console.error(err);
      return NextResponse.json({ error: err.message }, { status: 502 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
