"use client";

import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeProvider, ThemeContext } from "@/context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeWrapper>{children}</ThemeWrapper>
    </ThemeProvider>
  );
}

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState<"ltr" | "rtl">(i18n.language === "ar" ? "rtl" : "ltr");
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    const newDir = i18n.language === "ar" ? "rtl" : "ltr";

    const html = document.documentElement;
    html.style.transition = "opacity 0.3s ease";
    html.style.opacity = "0";

    const timeout = setTimeout(() => {
      setDirection(newDir);
      setLang(i18n.language);
      html.style.opacity = "1";
    }, 300);

    return () => clearTimeout(timeout);
  }, [i18n.language]);

  return (
    <html lang={lang} dir={direction} data-theme={theme} className="scroll-smooth">
      <head>
        <title>My Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          {`
            html {
              scroll-padding-top: 80px;
              transition: direction 0.3s ease, opacity 0.3s ease;
            }
          `}
        </style>
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col transition-all duration-300">
        {/* Sticky Navbar */}
        <header className="sticky top-0 z-50 w-full shadow-md bg-white dark:bg-gray-800 transition-all duration-300">
          <Navbar />
        </header>

        {/* Main content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 transition-all duration-300">
          {children}
        </main>
      </body>
    </html>
  );
};
