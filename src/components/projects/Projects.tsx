"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import foodApp from '@/../public/food app.png';
import hotel from '@/../public/hotel.png';
import pms from '@/../public/pmr.png';
import quiz from '@/../public/quiz.png';

const projects = [
  { id: 1, title: "Quizzes System", images: [quiz], techs: ["React.js","Next.js","Tailwind CSS","Redux Toolkit","i18next"], liveUrl:"https://quizzes-implementation.netlify.app/", githubUrl:"https://github.com/hm32295/Quiz" },
  { id: 2, title: "Hotel System", images: [hotel], techs:["React.js","TypeScript","MUI","Stripe","Swiper"], liveUrl:"https://h-s-m.netlify.app/", githubUrl:"https://github.com/hm32295/Hotel-System" },
  { id: 3, title: "Project Management System", images: [pms], techs:["React.js","Bootstrap","Chart.js","React Hook Form"], liveUrl:"https://projectmangementsystem.netlify.app/", githubUrl:"https://github.com/hm32295/PMS" },
  { id: 4, title: "Food App", images: [foodApp], techs:["React.js","JavaScript","Axios","Bootstrap","React Hook Form"], liveUrl:"https://food-application-hamza.netlify.app/", githubUrl:"https://github.com/hm32295/foodApp" },
];

export default function ProjectsPage() {
  const { t, i18n } = useTranslation();
  const [descOpen, setDescOpen] = useState<number | null>(null);
  const [imageOpen, setImageOpen] = useState<string | null>(null);

  // تغيير اتجاه الصفحة حسب اللغة
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <main id="projects" className="min-h-screen px-6 py-6 md:py-12 bg-[var(--color-background-light)] transition-all duration-500">

      {/* Header */}
      <motion.h1 initial={{ opacity: 0, y: -60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] text-center mb-24">
        {t("projects_title")}
      </motion.h1>

      {/* Projects Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
        {projects.map((project) => {
          const isDescOpen = descOpen === project.id;
          return (
            <motion.div key={project.id} className="relative rounded-3xl overflow-hidden shadow-lg cursor-pointer group" whileHover={{ scale: 1.03 }}>

              {/* Image */}
              <div onClick={() => setImageOpen(project.images[0])} className="relative w-full h-80 overflow-hidden rounded-3xl">
                <Image src={project.images[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold mt-4">{project.title}</h3>

              {/* Actions */}
              <div className="flex gap-4 mt-3 justify-center">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white hover:opacity-90 transition-all">
                  {t("live")} <FaExternalLinkAlt />
                </a>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all">
                  {t("code")} <FaGithub />
                </a>
              </div>

              {/* Description Toggle */}
              <button onClick={() => setDescOpen(isDescOpen ? null : project.id)} className="text-sm text-gray-600 underline mt-2">
                {isDescOpen ? t("hide_description") : t("view_description")}
              </button>

              {/* Description Panel */}
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: isDescOpen ? "auto" : 0, opacity: isDescOpen ? 1 : 0 }} transition={{ duration: 0.4 }} className="overflow-hidden mt-2 text-gray-700">
                {isDescOpen && <p className="p-2 bg-gray-100 rounded-lg">{t(`project_descriptions.${project.id}`)}</p>}
              </motion.div>

              {/* Techs */}
              <div className="flex flex-wrap gap-2 mt-3">
                {project.techs.map((tech, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs bg-[var(--color-primary)] text-white rounded-full font-semibold shadow-md">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Image Fullscreen Overlay */}
      {imageOpen && (
        <div onClick={() => setImageOpen(null)} className="fixed max-h-full inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer">
          <div className="relative w-full max-w-4xl mx-4">
            <Image src={imageOpen} alt="Project Image" width={1200} height={800} className="rounded-xl w-full h-auto object-contain" />
            <button onClick={() => setImageOpen(null)} className="absolute top-4 right-4 text-white text-2xl z-50">
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
