import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "../locales/us/common";
import ptCommon from "../locales/pt/common";
import esCommon from "../locales/es/common";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie", "localStorage"],
    },
    resources: {
      en: { common: enCommon },
      pt: { common: ptCommon },
      es: { common: esCommon },
    },
    debug: process.env.NODE_ENV === "development",
    defaultNS: "common",
    ns: ["common"],
  });

export default i18n;
