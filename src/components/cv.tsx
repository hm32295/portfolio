"use client";

import { useTranslation } from "react-i18next";
import { FaDownload } from "react-icons/fa";
const fileName="Hamza-Mohamed.pdf" 


export default function DownloadCV() {
    const {t} = useTranslation()
    const label:string=t("cv")
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = `/${fileName}`; 
        link.download = fileName;  
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center uppercase cursor-pointer gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
    >
      <FaDownload />
      {label}
    </button>
  );
}
