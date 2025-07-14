"use client";

import {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";

type Locale = "en" | "bn";

export interface ILocaleContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<ILocaleContextProps>({
  locale: "en",
  setLocale: () => {},
});

interface ILocaleWrapperProps {
  children: ReactNode;
}

export const LocaleProvider: FC<ILocaleWrapperProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState<Locale>("en");

  // Initialize locale from i18n
  useEffect(() => {
    const storedLocale = localStorage.getItem("locale");
    const detectedLocale = i18n.language?.substring(0, 2) as Locale;
    
    const initialLocale = storedLocale === "bn" ? "bn" : 
                         detectedLocale === "bn" ? "bn" : "en";
    
    setLocale(initialLocale);
    i18n.changeLanguage(initialLocale);
  }, [i18n]);

  // Update i18n when locale changes
  useEffect(() => {
    if (locale) {
      i18n.changeLanguage(locale);
      localStorage.setItem("locale", locale);
    }
  }, [locale, i18n]);

  const contextValue = useMemo(() => ({
    locale,
    setLocale: (newLocale: Locale) => setLocale(newLocale),
  }), [locale]);

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
};