import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import uk from "./locales/uk.json";
import cs from "./locales/cs.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      uk: { translation: uk },
      cs: { translation: cs }
    },
    fallbackLng: "uk", // За замовчуванням українська
    interpolation: { escapeValue: false }
  });

export default i18n;
