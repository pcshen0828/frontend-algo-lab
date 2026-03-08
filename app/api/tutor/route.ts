import { NextRequest, NextResponse } from "next/server";

// TODO: Replace with real LLM call (e.g., Anthropic SDK)
// import Anthropic from "@anthropic-ai/sdk";
// const client = new Anthropic();

type KnowledgeEntry = {
  keywords: string[];
  reply: string;
};

const TOPIC_KNOWLEDGE: Record<string, KnowledgeEntry[]> = {
  "binary-search": [
    {
      keywords: ["time complexity", "big o", "o(log"],
      reply:
        "Binary search runs in O(log n) time because it halves the search space on every comparison. For n=1,000,000, that's about 20 comparisons. The key insight: sorted order lets every comparison eliminate half the remaining candidates.",
    },
    {
      keywords: ["boundary", "leftmost", "rightmost", "lower bound", "upper bound"],
      reply:
        "For boundary search, use the 'left < right' loop condition instead of 'left <= right', and always move toward the boundary you want. Left boundary: if arr[mid] < target, set left = mid + 1; else set right = mid. The final left pointer is your answer.",
    },
    {
      keywords: ["scroll", "virtual", "offset", "viewport"],
      reply:
        "Virtual list scroll restoration is a great binary search application. Your chunks array has cumulative heights — binary search for the chunk where offset falls between chunk.start and chunk.end. This makes restoring scroll position O(log n) instead of O(n).",
    },
  ],
  "hash-map-set": [
    {
      keywords: ["normalize", "redux", "entities", "id"],
      reply:
        "The normalize-by-ID pattern converts an array like [{id:'a', ...}] into a Record<id, item>. This makes lookups O(1) instead of O(n). Redux Toolkit's createEntityAdapter does exactly this — ids array for ordering, entities object for fast lookup.",
    },
    {
      keywords: ["set", "deduplication", "unique", "duplicate"],
      reply:
        "JavaScript's Set maintains insertion order and gives O(1) has()/add()/delete(). For deduplication: new Set(array) removes duplicates while preserving first-occurrence order. To convert back: [...set] or Array.from(set).",
    },
    {
      keywords: ["map vs object", "map", "object"],
      reply:
        "Use Map when: keys are non-strings, you need insertion-order iteration, or you frequently add/delete keys. Use plain objects when: keys are known strings, you need JSON serialization, or you're working with TypeScript Record<K,V> types.",
    },
  ],
  "tree-traversal": [
    {
      keywords: ["bfs", "breadth", "level"],
      reply:
        "BFS visits nodes level by level using a queue. It's ideal when you need level information (e.g., depth of a comment thread) or when the target is likely near the root. In lazy-loading folder trees, BFS naturally loads one level at a time.",
    },
    {
      keywords: ["dfs", "depth", "recursive", "stack overflow"],
      reply:
        "DFS can hit JavaScript's call stack limit (~10,000 frames) on very deep trees. The fix: convert to iterative DFS using an explicit stack. Push children onto the stack instead of making recursive calls. Same traversal order, no stack overflow risk.",
    },
    {
      keywords: ["pre-order", "post-order", "in-order", "order"],
      reply:
        "Pre-order (root → children): use when parent data is needed before rendering children — like passing props down in React. Post-order (children → root): use for bottom-up aggregation, like computing folder sizes. In-order (left → root → right): specific to BSTs, gives sorted output.",
    },
  ],
};

const GENERIC_REPLIES = [
  "Great question! Let me think through this. The key to understanding this pattern is identifying what property of the data structure enables the optimization. What specific aspect are you finding tricky?",
  "That's a common point of confusion. The best way to build intuition is to trace through a small example by hand. Try with an array of 4-5 elements and track the state at each step.",
  "From a frontend perspective, the most important thing to internalize is the problem signal — when does your code *want* to use this pattern? Think about when you've written O(n²) code that felt slow.",
  "Good instinct! The time complexity comes directly from how much work you eliminate per step. If you eliminate half the input each step, that's O(log n). If you eliminate one element, that's O(n).",
  "This connects to a broader principle: use the structure of your data to your advantage. Sorted arrays, hash keys, tree parent-child relationships — each encodes information you can exploit to avoid redundant work.",
];

function getMockReply(topicSlug: string, userMessage: string): string {
  const lower = userMessage.toLowerCase();
  const topicEntries = TOPIC_KNOWLEDGE[topicSlug] ?? [];

  for (const entry of topicEntries) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.reply;
    }
  }

  // Cross-topic keyword matching
  for (const entries of Object.values(TOPIC_KNOWLEDGE)) {
    for (const entry of entries) {
      if (entry.keywords.some((kw) => lower.includes(kw))) {
        return entry.reply;
      }
    }
  }

  // Generic fallback
  return GENERIC_REPLIES[Math.floor(Math.random() * GENERIC_REPLIES.length)];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topicSlug, userMessage } = body as {
      topicSlug: string;
      userMessage: string;
    };

    if (!userMessage?.trim()) {
      return NextResponse.json({ error: "userMessage is required" }, { status: 400 });
    }

    const reply = getMockReply(topicSlug ?? "", userMessage);

    // Simulate slight latency
    await new Promise((r) => setTimeout(r, 400));

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
