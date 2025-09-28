"use client";

import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { MdLanguage } from "react-icons/md";
import { CiHome, CiUser, CiFolderOn, CiMail } from "react-icons/ci";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import "../config/i18n";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation(); 
  const [lang, setLang] = useState(i18n.language || "en");

  // تغيير اتجاه الصفحة بناءً على اللغة
  useEffect(() => {
    document.documentElement.style.transition = "all 0.5s ease";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const themes: typeof theme[] = [
    "modern", "creative", "elegant", "soft", "futuristic", "nature", "cyberpunk"
  ];

  const handleToggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const handleToggleLang = () => {
    const newLang = lang === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  const navLinks = [
    { icon: <CiHome />, label: t("home"), href: "home" },
    { icon: <CiUser />, label: t("about"), href: "about" },
    { icon: <CiFolderOn />, label: t("projects"), href: "projects" },
    { icon: <CiMail />, label: t("contact"), href: "contact" },
  ];

  const mobileMenuVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.4, ease: "easeInOut", staggerChildren: 0.1 } 
    },
    exit: { y: -100, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[var(--color-background-light)]/80 shadow-xl" data-theme={theme}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 font-bold text-2xl cursor-pointer text-[var(--color-primary)] hover:scale-105 transition-transform duration-300">
          <CiHome size={32} />
          <span>{t("portfolio")}</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center font-medium">
          {navLinks.map((link, i) => (
            <motion.li
              key={i}
              className="relative group cursor-pointer text-[var(--color-text-primary)] hover:scale-105 transform transition-all duration-300"
              whileHover={{ y: -3 }}
            >
              <Link href={`#${link.href}`} className="flex items-center gap-2 transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                {link.icon} {link.label}
              </Link>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full"></span>
            </motion.li>
          ))}

          <li>
            <button
              onClick={handleToggleTheme}
              className="px-4 py-2 rounded-xl border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white shadow-lg transition-all duration-300 font-semibold"
            >
              {t("theme")}
            </button>
          </li>

          <li>
            <button
              onClick={handleToggleLang}
              className="px-4 py-2 rounded-xl border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg"
            >
              <MdLanguage size={18} /> {lang.toUpperCase()}
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-xl border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 shadow-md"
          >
            {t("theme")}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-xl border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 shadow-md"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <FiX size={28} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <FiMenu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden fixed top-[72px] left-0 w-full bg-[var(--color-background-light)] shadow-2xl rounded-b-xl"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul className="flex flex-col items-center space-y-6 py-6 font-medium">
              {navLinks.map((link, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-transform duration-300 cursor-pointer"
                  variants={linkVariants}
                  onClick={() => setOpen(false)}
                >
                  <Link href={`#${link.href}`} className="flex items-center gap-3">
                    {link.icon} {link.label}
                  </Link>
                </motion.li>
              ))}

              <motion.li
                className="px-4 py-2 rounded-xl border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 flex items-center gap-2 font-semibold shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4 } }}
                exit={{ opacity: 0 }}
                onClick={handleToggleLang} 
              >
                <MdLanguage size={18} /> {lang.toUpperCase()}
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
