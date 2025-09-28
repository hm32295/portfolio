"use client";

import { useState, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { FiMenu, FiX } from "react-icons/fi";
import { MdLanguage } from "react-icons/md";
import { CiHome, CiUser, CiFolderOn, CiMail } from "react-icons/ci";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  const themes: typeof theme[] = ["modern","creative","elegant","soft","futuristic","nature","cyberpunk"];
  const handleToggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const navLinks = [
    { icon: <CiHome />, label: "Home" },
    { icon: <CiUser />, label: "About" },
    { icon: <CiFolderOn />, label: "Projects" },
    { icon: <CiMail />, label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[var(--color-background-light)]/90 backdrop-blur-md shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 font-bold text-2xl cursor-pointer text-[var(--color-primary)]">
          <CiHome size={32} />
          <span>Portfolio</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center font-medium">
          {navLinks.map((link, i) => (
            <li key={i} className="relative group cursor-pointer text-[var(--color-text-primary)]">
              <span className="flex items-center gap-2 transition-colors duration-300 group-hover:text-[var(--color-primary)]">
                {link.icon} {link.label}
              </span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}

          {/* Theme Button */}
          <li>
            <button
              onClick={handleToggleTheme}
              className="px-4 py-2 rounded-md border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 font-semibold"
            >
              Theme
            </button>
          </li>

          {/* Language Button */}
          <li>
            <button className="px-4 py-2 rounded-md border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 flex items-center gap-2 font-semibold">
              <MdLanguage size={18} /> EN
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-md border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
          >
            Theme
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
          >
            {open ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[72px] left-0 w-full bg-[var(--color-background-light)] shadow-lg transition-transform duration-300 ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <ul className="flex flex-col items-center space-y-6 py-6 font-medium">
          {navLinks.map((link, i) => (
            <li key={i} className="flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors duration-300">
              {link.icon} {link.label}
            </li>
          ))}
          {/* Language Button */}
          <li>
            <button className="px-4 py-2 rounded-md border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 flex items-center gap-2 font-semibold">
              <MdLanguage size={18} /> EN
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
