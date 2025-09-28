"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function ContactPage() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const contactLinks = [
    { label: t("phone"), icon: <FaPhone />, url: "tel:01124475468" },
    { label: t("whatsapp"), icon: <FaWhatsapp />, url: "https://wa.me/201124475468" },
    { label: t("github"), icon: <FaGithub />, url: "https://github.com/hm32295" },
    { label: t("linkedin"), icon: <FaLinkedin />, url: "https://www.linkedin.com/in/hamza-mohamed-3015a2293/" },
    { label: t("email"), icon: <FaEnvelope />, url: "mailto:hm32295@gmail.com" },
  ];

  return (
    <main id="contact" className=" min-h-screen flex flex-col items-center justify-start px-6 py-6 md:py-12 bg-[var(--color-background-light)] transition-all duration-500">

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold text-[var(--color-primary)] mb-6 text-center"
      >
        {t("contact_title")}
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[var(--color-text-secondary)] text-lg md:text-xl mb-12 text-center max-w-3xl"
      >
        {t("contact_description")}
      </motion.p>

      {/* Contact Links */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-5xl w-full"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        {contactLinks.map((link, idx) => (
          <motion.a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <div className="text-4xl mb-2">{link.icon}</div>
            <span className="font-semibold text-center">{link.label}</span>
          </motion.a>
        ))}
      </motion.div>

    </main>
  );
}
