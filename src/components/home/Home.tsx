"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '@/../public/logo.png';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const [displayedText, setDisplayedText] = useState("");
  const [fullText, setFullText] = useState("");

  useEffect(() => {
    const text = t('about_text', { defaultValue: "" });
    setFullText(typeof text === "string" ? text : "");
  }, [i18n.language, t]);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    if (!fullText) return;
    setDisplayedText("");
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [fullText]);

  const isRTL = i18n.language === "ar";

  return (
    <main className="min-h-screen pt-24 flex flex-col items-center justify-start px-6 py-6 md:py-12 bg-[var(--color-background-light)] transition-all duration-500">

      {/* Hero Section */}
      <section className={`w-full max-w-6xl flex flex-wrap flex-col md:flex-row items-center justify-between gap-5 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
        <h1 className={`text-4xl text-center mt-4 md:text-6xl w-full font-bold text-[var(--color-text-primary)] mb-2 leading-tight md:text-left`}>
          {isRTL ? "حمزة محمد" : "Hamza Mohamed"}
        </h1>
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h1 className={`text-4xl md:text-6xl font-bold text-[var(--color-primary)] mb-4 leading-tight ${isRTL ? 'text-right' : 'text-left'} text-center md:text-left`}>
            {isRTL ? "مرحبا بكم في ملفي البرمجي" : "Welcome to My Programming Portfolio"}
          </h1>
          <p className={`text-[var(--color-text-secondary)] text-lg md:text-xl mb-6 leading-relaxed tracking-wide ${isRTL ? 'text-right' : 'text-left'} text-center md:text-left`}>
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <div className="w-72 h-72 md:w-80 md:h-80 rounded-full gradient-bg shadow-2xl flex items-center justify-center overflow-hidden">
            <Image src={logo} alt="logo" className="w-full h-full object-cover object-top" />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
