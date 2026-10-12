import { createContext, useContext, useEffect, useState } from "react";
import { ui } from "./i18n";

const LangContext = createContext(null);

// Idioma inicial: el que guardó la persona; si no hay, el del navegador (es / en).
function initialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "es" || saved === "en") return saved;
  } catch {
    /* sin acceso a localStorage: seguimos con el idioma del navegador */
  }
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = ui[lang].docTitle;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* ignorar */
    }
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang, t: ui[lang] }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
