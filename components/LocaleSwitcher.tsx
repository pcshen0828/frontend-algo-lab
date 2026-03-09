"use client";

import { usePathname, Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  "zh-TW": "繁中",
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          className={`text-xs px-2 py-1 rounded transition-colors ${
            l === locale
              ? "bg-blue-600 text-white"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          {LOCALE_LABELS[l] ?? l}
        </Link>
      ))}
    </div>
  );
}
