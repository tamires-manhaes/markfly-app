// src/hooks/useI18n.js
import { useTranslation } from "react-i18next";

export const useI18n = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  const languages = [
    { code: "PT", name: "Português", flag: "🇧🇷" },
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "ES", name: "Español", flag: "🇪🇸" },
  ];

  return {
    t,
    changeLanguage,
    currentLanguage,
    languages,
  };
};
