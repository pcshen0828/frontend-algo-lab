export default function SectionList({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">
        {heading}
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-gray-700 leading-relaxed">
            <span className="text-gray-400 mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
