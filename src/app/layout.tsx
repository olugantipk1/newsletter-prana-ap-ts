import type { Metadata } from "next";
import { Inter, Noto_Sans_Telugu } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { FontWrapper } from "@/components/FontWrapper";
import { Header } from "@/components/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const notoSansTelugu = Noto_Sans_Telugu({
  subsets: ["telugu", "latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-telugu",
});

export const metadata: Metadata = {
  title: "Prana — Daily Satirical Civic Newsletter",
  description:
    "Daily civic newsletter for Andhra Pradesh and Telangana. Sarcastic but sincere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSansTelugu.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
        <LanguageProvider>
          <FontWrapper>
            <Header />
            <main className="mx-auto max-w-[720px] px-4 pb-16 pt-6">
              {children}
            </main>
          </FontWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
