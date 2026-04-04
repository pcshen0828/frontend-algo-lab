import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <NextIntlClientProvider messages={messages}>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 min-h-14 h-auto sm:h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors flex items-center gap-2"
          >
            <Image src="/icon.svg" alt="" width={24} height={24} />
            <span className="hidden sm:inline">{t("brand")}</span>
          </Link>
          <nav className="flex items-center gap-3 sm:gap-6 text-sm">
            <Link
              href="/algorithms"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t("algorithms")}
            </Link>
            <LocaleSwitcher />
          </nav>
        </div>
      </header>
      <main className="min-h-screen">{children}</main>
    </NextIntlClientProvider>
  );
}
