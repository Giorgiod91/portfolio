"use client";

import { createContext, useContext } from "react";

import { CONTENT, type Lang } from "./data";
import { UI } from "./strings";

const LangContext = createContext<Lang>("de");

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang() {
  const lang = useContext(LangContext);
  return { lang, t: UI[lang], c: CONTENT[lang] };
}
