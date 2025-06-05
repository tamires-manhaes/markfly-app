// src/lib/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Locales
import enCommon from "../locales/us/common.json";
import ptCommon from "../locales/pt/common.json";
import esCommon from "../locales/es/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["cookie", "navigator", "htmlTag"],
      caches: ["cookie"],
    },
    resources: {
      en: { common: enCommon },
      pt: { common: ptCommon },
      es: { common: esCommon },
    },
  });

export default i18n;
