import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { AudioProvider } from "@/components/audio/AudioContext";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ana Maidana — Creative Producer & Recording Engineer",
  description:
    "Exploring diaspora, cultural identity, and musical translation through sound. Portfolio of Ana Maidana, Paraguayan creative producer, recording & mixing engineer, sound designer, and guitarist based in Abu Dhabi.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-off-white text-charcoal antialiased">
        <NextIntlClientProvider locale={locale}>
          <AudioProvider>
            <SmoothScroll>
              <Navigation />
              <main>{children}</main>
              <Footer />
            </SmoothScroll>
          </AudioProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
