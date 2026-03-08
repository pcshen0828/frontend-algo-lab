export default function CodeBlock({
  code,
  language = "typescript",
}: {
  code: string;
  language?: string;
}) {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-700">
      <div className="bg-gray-800 text-gray-400 text-xs px-4 py-2 font-mono">
        {language}
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
