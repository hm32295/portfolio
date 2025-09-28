"use client";

import { motion } from "framer-motion";
import { FaReact, FaPhp, FaCss3Alt, FaJsSquare, FaGithub, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiRedux, SiMongodb } from "react-icons/si";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";


export default function AboutPage() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const skillsKnown = [
    { name: "React.js", icon: <FaReact size={32} color="#61DBFB" /> },
    { name: "Next.js", icon: <SiNextdotjs size={32} color="#000000" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={32} color="#38B2AC" /> },
    { name: "JavaScript", icon: <FaJsSquare size={32} color="#F7DF1E" /> },
    { name: "TypeScript", icon: <SiTypescript size={32} color="#3178C6" /> },
    { name: "CSS", icon: <FaCss3Alt size={32} color="#264DE4" /> },
    { name: "Redux Toolkit", icon: <SiRedux size={32} color="#764ABC" /> },
    { name: "GitHub", icon: <FaGithub size={32} /> },
  ];

  const skillsLearning = [
    { name: "Node.js", icon: <FaNodeJs size={32} color="#3C873A" /> },
    { name: "PHP", icon: <FaPhp size={32} color="#8892BE" /> },
    { name: "MongoDB", icon: <SiMongodb size={32} color="#47A248" /> },
  ];

  return (
    <main id="about" className="min-h-screen flex flex-col items-center justify-start px-6 py-6 md:py-12 bg-[var(--color-background-light)] transition-all duration-500">

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold text-[var(--color-primary)] mb-6 text-center cursor-default"
      >
        {t("about_title")}
      </motion.h1>

      {/* Introduction */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[var(--color-text-secondary)] text-lg md:text-xl mb-12 text-center max-w-4xl leading-relaxed cursor-default"
      >
        {t("about_text_me")}
      </motion.p>

      {/* Known Skills */}
      <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 cursor-default">{t("skills_known")}</h2>
      <motion.div
        className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {skillsKnown.map((skill, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-[var(--color-primary)] shadow-md transition-all duration-300 cursor-pointer
                       hover:scale-105 hover:bg-[var(--color-primary)] hover:text-white hover:border-transparent"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          >
            <div className="mb-2">{skill.icon}</div>
            <span className="font-semibold text-center">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Learning Skills */}
      <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 cursor-default">{t("skills_learning")}</h2>
      <motion.div
        className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {skillsLearning.map((skill, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-[var(--color-primary)] shadow-md transition-all duration-300 cursor-pointer
                       hover:scale-105 hover:bg-[var(--color-primary)] hover:text-white hover:border-transparent"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          >
            <div className="mb-2">{skill.icon}</div>
            <span className="font-semibold text-center">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>

    </main>
  );
}
