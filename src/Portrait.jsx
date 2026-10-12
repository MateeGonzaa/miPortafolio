import { useLang } from "./LanguageContext";

export default function Portrait() {
  const { t } = useLang();
  return (
    <img
      src="/foto-mateo.png"
      alt={t.portraitAlt}
      width="720"
      height="900"
      className="aspect-4/5 w-40 rounded-xl border border-line object-cover object-top grayscale-[40%] transition duration-500 hover:grayscale-0 sm:w-44"
    />
  );
} 
