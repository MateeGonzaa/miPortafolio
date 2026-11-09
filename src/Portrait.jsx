import { useLang } from "./LanguageContext";
import { profile } from "./data";

/* Retrato con marco de degradé, halo violeta y etiqueta de ubicación */
export default function Portrait() {
  const { t } = useLang();
  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm">
      {/* halo de fondo */}
      <div aria-hidden="true" className="absolute -inset-6 rounded-full bg-violet/30 blur-[80px]" />
      {/* aro decorativo */}
      <div
        aria-hidden="true"
        className="absolute -right-5 -top-5 h-28 w-28 rounded-full border border-dashed border-glow/40 motion-reduce:hidden"
      />
      <div className="relative rounded-[2rem] bg-gradient-to-br from-violet via-fuchsia-400/60 to-line p-[2px]">
        <div className="relative overflow-hidden rounded-[calc(2rem-2px)] bg-panel">
          <img
            src="/foto-mateo.jpg"
            alt={t.portraitAlt}
            width="960"
            height="1200"
            fetchPriority="high"
            className="aspect-4/5 w-full object-cover object-top"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-violet/10" />
          <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-ink/60 px-3 py-1.5 font-mono text-[11px] text-lilac backdrop-blur-md">
            {profile.location.split(",")[0]} · AR
          </span>
        </div>
      </div>
    </div>
  );
}