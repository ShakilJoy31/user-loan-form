import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const isBrowser = typeof window !== "undefined";

if (isBrowser) {
  Promise.all([
    import("i18next-browser-languagedetector"),
    import("i18next-http-backend"),
  ]).then(([{ default: LanguageDetector }, { default: Backend }]) => {
    i18n
      .use(Backend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        fallbackLng: "en",
        supportedLngs: ["en", "bn"],
        interpolation: {
          escapeValue: false,
        },
        backend: {
          loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
      });
  });
}

export default i18n;
